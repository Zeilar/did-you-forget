import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./index.service";
import type {
  CreatedUserDto,
  EditUserDto,
  RegisterUserDto,
  UserWithoutPasswordDto,
} from "@did-you-forget/dto";
import { AuthGuard } from "../../common/guards";
import { IpAddress, SessionId } from "../../common/decorators";
import { PrismaService } from "../db/prisma/index.service";
import type { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth/index.service";

@Controller("/user")
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("/register")
  public async register(
    @Body() registerUserDto: RegisterUserDto,
    @IpAddress() ipAddress: string | undefined,
    @Res({ passthrough: true }) res: Response
  ): Promise<CreatedUserDto> {
    const user = await this.userService.create(registerUserDto);
    await this.authService.signIn({ ipAddress: ipAddress ?? null, ...registerUserDto }, res);
    return user;
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get("/")
  public profile(@SessionId() sessionId: string): Promise<UserWithoutPasswordDto> {
    return this.userService.getBySessionId(sessionId);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch("/")
  public async edit(
    @SessionId() sessionId: string,
    @Body() editUserDto: EditUserDto
  ): Promise<UserWithoutPasswordDto> {
    const { id } = await this.userService.getBySessionId(sessionId);
    return this.userService.edit(id, editUserDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/clear-sessions")
  public async clearSessions(
    @SessionId() sessionId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    const { id } = await this.userService.getBySessionId(sessionId);
    await this.prismaService.session.deleteMany({ where: { userId: id } });
    res.clearCookie(this.configService.getOrThrow<string>("sessionCookie.name"));
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/verify/:pendingVerificationId")
  public async verify(
    @Param("pendingVerificationId") pendingVerificationId: string
  ): Promise<void> {
    await this.userService.verify(pendingVerificationId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/send-verification-code/:email")
  public async sendVerificationCode(@Param("email") email: string): Promise<void> {
    await this.userService.sendVerificationCode(email);
  }
}
