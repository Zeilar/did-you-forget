import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./index.service";
import type { RefreshAccessTokenDto, SignInDto, SignInReturnDto } from "./dto";
import { JwtRefreshTokenGuard } from "./guards/jwt/refresh-token.guard";

@Controller("/auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("/sign-in")
  public signIn(@Body() signInDto: SignInDto): Promise<SignInReturnDto> {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post("/refresh-access-token")
  public async refreshAccessToken(@Req() req: Express.Request): Promise<RefreshAccessTokenDto> {
    if (!req.user) {
      throw new UnauthorizedException("req.user not found.");
    }
    const accessToken = await this.authService.generateAccessToken(req.user);
    return { accessToken };
  }
}
