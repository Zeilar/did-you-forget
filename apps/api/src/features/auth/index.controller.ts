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
import type { PasswordResetConfirmDto, PasswordResetDto, SignInDto } from "@did-you-forget/dto";
import type { Response } from "express";
import { IpAddress, SessionId } from "../../common/decorators";
import { ConfigService } from "@nestjs/config";
import { MailjetService } from "../mailjet/index.service";

@Controller("/auth")
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly mailjetService: MailjetService
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/password-reset")
  public async passwordReset(@Body() { email }: PasswordResetDto): Promise<void> {
    const { id } = await this.authService.createPasswordReset(email);
    const href = `${this.configService.getOrThrow("cors")}/password-reset/${id}`;
    await this.mailjetService.sendMail(
      { email, name: email },
      "Password Reset",
      `
        <div>
          <p>Click this link to reset your password: <a href=${href}>${href}</a></p>
          <p>This link will expire shortly.</p>
        </div>
        <br />
        <div>
          <p>If you didn't make this request, kindly ignore this mail.</p>
        </div>
      `.trim()
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/password-reset/confirm")
  public async passwordResetConfirmation(
    @Body() { id, password }: PasswordResetConfirmDto
  ): Promise<void> {
    await this.authService.confirmPasswordReset(id, password);
  }
}
