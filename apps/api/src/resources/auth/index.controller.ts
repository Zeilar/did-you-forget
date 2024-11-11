import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./index.service";
import type { SignInDto, SignInResultDto } from "./dto";
import type { Response } from "express";

@Controller("/auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/sign-in")
  public async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<SignInResultDto> {
    const { sessionId, expires } = await this.authService.signIn(signInDto);
    res.cookie("dyf-session", sessionId, {
      sameSite: true,
      httpOnly: true,
      secure: process.env.SECURE === "true",
      expires: expires ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10), // Remember me equals 10 years.
    });
    return { sessionId };
  }
}
