import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./index.service";
import type { SignInDto } from "./dto";
import { JwtRefreshTokenGuard } from "./guards/jwt/refresh-token.guard";
import type { CookieOptions, Response } from "express";

@Controller("/auth")
export class AuthController {
  private readonly jwtCookieDefaultOptions: CookieOptions = {
    sameSite: true,
    httpOnly: true,
    secure: process.env.SECURE === "true",
  };

  public constructor(private readonly authService: AuthService) {}

  private setJwtAccessToken(res: Response, accessToken: string): void {
    res.cookie("dyf-jwt-access-token", accessToken, {
      ...this.jwtCookieDefaultOptions,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days.
    });
  }

  private setJwtRefreshToken(res: Response, refreshToken: string): void {
    res.cookie("dyf-jwt-refresh-token", refreshToken, {
      ...this.jwtCookieDefaultOptions,
      expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes.
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/sign-in")
  public async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.signIn(signInDto);
    this.setJwtAccessToken(res, accessToken);
    this.setJwtRefreshToken(res, refreshToken);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/refresh-access-token")
  public async refreshAccessToken(
    @Req() req: Express.Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    if (!req.user) {
      throw new UnauthorizedException("req.user not found.");
    }
    this.setJwtAccessToken(res, await this.authService.generateAccessToken(req.user));
  }
}
