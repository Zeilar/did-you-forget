import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { PrismaService } from "../db/prisma/index.service";
import type { SignInDto, SignInResultDto } from "./dto";
import type { Session } from "@prisma/client";

@Injectable()
export class AuthService {
  public constructor(private readonly prismaService: PrismaService) {}

  private getCookieExpiresDate(): Date {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days.
  }

  public async signIn({
    email,
    password,
    rememberMe,
  }: SignInDto): Promise<SignInResultDto & { expires: Session["expires"] }> {
    const { id } = await this.validateUser({ email, password });
    const expires = !rememberMe ? this.getCookieExpiresDate() : null;
    const session = await this.prismaService.session.create({
      data: { user: { connect: { id } }, expires },
    });
    return { expires, sessionId: session.id };
  }

  private comparePassword(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }

  private async validateUser({ email, password }: SignInDto) {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${JSON.stringify(email)} not found.`);
    }
    if (!(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException("Password does not match.");
    }
    return user;
  }
}
