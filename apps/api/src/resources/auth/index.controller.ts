import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./index.service";
import type { SignInDto, SignInResultDto } from "./dto";
import type { Response } from "express";
import { SessionId } from "../decorators/session-id.decorator";
import { IpAddress } from "../decorators";
import { ConfigService } from "@nestjs/config";

@Controller("/auth")
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/sign-in")
  public async signIn(
    @Body() signInDto: SignInDto,
    @IpAddress() ipAddress: string | undefined,
    @Res({ passthrough: true }) res: Response
  ): Promise<SignInResultDto> {
    const { sessionId, expires } = await this.authService.signIn({
      ...signInDto,
      ipAddress: ipAddress || null,
    });
    res.cookie(this.configService.getOrThrow<string>("sessionCookieName"), sessionId, {
      sameSite: true,
      httpOnly: true,
      secure: process.env.SECURE === "true",
      expires: expires ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10), // Remember me equals 10 years.
    });
    return { sessionId };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/logout")
  public async logout(
    @Res({ passthrough: true }) res: Response,
    @SessionId() sessionId: string
  ): Promise<void> {
    const { id } = await this.authService.logout(sessionId);
    if (!id) {
      throw new BadRequestException(`Failed to delete session with id ${(id)}.`);
    }
    res.clearCookie(this.configService.getOrThrow<string>("sessionCookieName"));
  }
}
