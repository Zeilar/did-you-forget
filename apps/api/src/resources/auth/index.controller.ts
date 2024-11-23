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
import type { SignInDto } from "@did-you-forget/dto";
import type { Response } from "express";
import { SessionId } from "../../common/decorators/session-id.decorator";
import { IpAddress } from "../../common/decorators";
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
  ): Promise<void> {
    await this.authService.signIn(
      {
        ...signInDto,
        ipAddress: ipAddress || null,
      },
      res
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/logout")
  public async logout(
    @Res({ passthrough: true }) res: Response,
    @SessionId() sessionId: string
  ): Promise<void> {
    const { id } = await this.authService.deleteSessionById(sessionId);
    if (!id) {
      throw new BadRequestException(`Failed to delete session with id ${id}.`);
    }
    res.clearCookie(this.configService.getOrThrow<string>("sessionCookie.name"));
  }
}
