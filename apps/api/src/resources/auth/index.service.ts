import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { PrismaService } from "../db/prisma/index.service";
import type { SignInDto, SignInResultDto } from "./dto";
import type { Session } from "@prisma/client";
import type { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private getCookieExpiresDate(): Date {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 4); // 28 days (4 weeks).
  }

  public async signIn(
    { email, password, rememberMe, ipAddress }: SignInDto & Pick<Session, "ipAddress">,
    res: Response
  ): Promise<SignInResultDto & { expires: Session["expires"] }> {
    const { id } = await this.validateUser({ email, password });
    const expires = !rememberMe ? this.getCookieExpiresDate() : null;
    const { id: sessionId } = await this.prismaService.session.create({
      data: { user: { connect: { id } }, expires, ipAddress },
    });
    res.cookie(this.configService.getOrThrow<string>("sessionCookie.name"), sessionId, {
      domain: this.configService.getOrThrow<string>("sessionCookie.domain"),
      sameSite: true,
      httpOnly: true,
      secure: process.env.SECURE === "true",
      expires: expires ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10), // Remember me equals 10 years.
    });
    return { expires, sessionId };
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
}
