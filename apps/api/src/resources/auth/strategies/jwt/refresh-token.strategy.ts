import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { JwtAccessTokenDto } from "../../dto";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  public validate(req: Request, payload: JwtAccessTokenDto): JwtAccessTokenDto {
    const refreshToken = req.get("Authorization")?.replace("Bearer", "").trim();
    if (!refreshToken) {
      throw new UnauthorizedException("refreshToken not found in Authorization header.");
    }
    return { ...payload, refreshToken };
  }
}
