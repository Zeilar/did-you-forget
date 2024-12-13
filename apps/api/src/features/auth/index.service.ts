import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { PrismaService } from "../db/prisma/index.service";
import type { SignInDto, SignInResultDto } from "@did-you-forget/dto";
import type { PendingPasswordReset, Session } from "@prisma/client";
import type { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/index.service";

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  public async signIn(
    { email, password, rememberMe, ipAddress }: SignInDto & Pick<Session, "ipAddress">,
    res: Response
  ): Promise<SignInResultDto & { expires: Session["expires"] }> {
    const { id } = await this.validateUser({ email, password });
    const expires = rememberMe
      ? this.configService.getOrThrow<string>("sessionCookie.rememberMeExpires")
      : this.configService.getOrThrow<string>("sessionCookie.expires");
    const expiresDate = new Date(Date.now() + parseInt(expires));
    const { id: sessionId } = await this.prismaService.session.create({
      data: { user: { connect: { id } }, expires: expiresDate, ipAddress },
    });
    res.cookie(this.configService.getOrThrow<string>("sessionCookie.name"), sessionId, {
      domain: this.configService.getOrThrow<string>("sessionCookie.domain"),
      sameSite: true,
      httpOnly: true,
      secure: process.env.SECURE === "true",
      expires: expiresDate,
    });
    return { expires: expiresDate, sessionId };
  }

  public deleteSessionById(sessionId: string): Promise<Pick<Session, "id">> {
    return this.prismaService.session.delete({ where: { id: sessionId }, select: { id: true } });
  }

  private comparePassword(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }

  private async validateUser({ email, password }: SignInDto) {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    if (!(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException("Password does not match.");
    }
    return user;
  }

  public async createPasswordReset(email: string): Promise<PendingPasswordReset> {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    await this.prismaService.pendingPasswordReset.deleteMany({ where: { userId: user.id } });
    return this.prismaService.pendingPasswordReset.create({
      data: {
        expires: new Date(
          Date.now() + this.configService.getOrThrow("pendingPasswordResetExpires")
        ),
        user: { connect: { id: user.id } },
      },
    });
  }

  public async confirmPasswordReset(id: string, password: string): Promise<void> {
    const pendingPasswordReset = await this.prismaService.pendingPasswordReset.findFirst({
      where: { id },
    });
    if (!pendingPasswordReset) {
      throw new NotFoundException(`Password reset with id ${id} not found.`);
    }
    await this.prismaService.pendingPasswordReset.deleteMany({ where: { id } });
    await this.prismaService.user.update({
      where: { id: pendingPasswordReset.userId },
      data: { password: await this.userService.hash(password) },
    });
  }
}
