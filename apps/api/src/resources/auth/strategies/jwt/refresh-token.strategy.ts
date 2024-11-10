import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import type { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { JwtAccessTokenDto } from "../../dto";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  public constructor() {
    super({
      jwtFromRequest: (req: Request) => req.cookies["dyf-jwt-refresh-token"],
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  public validate(req: Request, payload: JwtAccessTokenDto): JwtAccessTokenDto {
    const refreshToken = req.cookies["dyf-jwt-refresh-token"];
    if (!refreshToken) {
      throw new UnauthorizedException("JWT refresh token could not be found in cookies.");
    }
    return { ...payload, refreshToken };
  }
}
