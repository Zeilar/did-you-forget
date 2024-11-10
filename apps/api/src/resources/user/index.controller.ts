import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./index.service";
import type { RegisterUserDto } from "./dto";
import { JwtAccessTokenGuard } from "../auth/guards/jwt/access-token.guard";
import { AuthService } from "../auth/index.service";

@Controller("/user")
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }

  @Get("/profile")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessTokenGuard)
  public async profile(@Req() req: Express.Request) {
    return this.userService.profile(this.authService.extractAccessToken(req).id);
  }
}
