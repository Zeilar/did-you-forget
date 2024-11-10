import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./index.service";
import type { SignInDto, SignInReturnDto } from "./dto";

@Controller("/auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("/sign-in")
  public signIn(@Body() signInDto: SignInDto): Promise<SignInReturnDto> {
    return this.authService.signIn(signInDto);
  }
}
