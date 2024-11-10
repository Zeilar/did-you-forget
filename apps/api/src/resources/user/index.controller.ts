import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./index.service";
import type { RegisterUserDto } from "./dto";
import { JwtAccessTokenGuard } from "../auth/guards/jwt/access-token.guard";
import { ExtractJwt } from "passport-jwt";
import { JwtService } from "@nestjs/jwt";
import type { JwtAccessTokenDto } from "../auth/dto";

@Controller("/user")
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
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
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!accessToken) {
      throw new BadRequestException("Missing accessToken.");
    }
    const { id }: JwtAccessTokenDto = await this.jwtService.decode(accessToken);
    return this.userService.profile(id);
  }
}
