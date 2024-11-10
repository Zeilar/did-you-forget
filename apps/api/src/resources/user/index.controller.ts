import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./index.service";
import type { RegisterUserDto } from "./dto";
import { AuthGuard } from "../auth/index.guard";

@Controller("/user")
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }

  @Get("/profile")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async profile() {
    return { hello: "there" };
  }
}
