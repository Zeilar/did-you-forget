import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./index.service";
import type { CreatedUserDto, RegisterUserDto, UserWithoutPasswordDto } from "./dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { SessionId } from "../auth/decorators/session-id.decorator";

@Controller("/user")
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("/register")
  public register(@Body() registerUserDto: RegisterUserDto): Promise<CreatedUserDto> {
    return this.userService.createUser(registerUserDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get("/profile")
  public profile(@SessionId() sessionId: string): Promise<UserWithoutPasswordDto> {
    return this.userService.getUserBySessionId(sessionId);
  }
}
