import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./index.service";
import type { SignInDto, SignInResultDto } from "./dto";
import type { Request, Response } from "express";
import { SessionId } from "./decorators/session-id.decorator";

@Controller("/auth")
export class AuthController {
  private readonly sessionCookieName = "dyf-session";

  public constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/sign-in")
  public async signIn(
    @Body() signInDto: SignInDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<SignInResultDto> {
    const { sessionId, expires } = await this.authService.signIn({
      ...signInDto,
      ipAddress: req.ip || null,
    });
    res.cookie(this.sessionCookieName, sessionId, {
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
      throw new BadRequestException(`Failed to delete session with id ${JSON.stringify(id)}.`);
    }
    res.clearCookie(this.sessionCookieName);
  }
}
