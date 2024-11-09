import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { UserService } from "./index.service";
import type { RegisterUserDto } from "./dto";

@Controller("/user")
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post("/register")
  @HttpCode(201)
  public async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }
}
