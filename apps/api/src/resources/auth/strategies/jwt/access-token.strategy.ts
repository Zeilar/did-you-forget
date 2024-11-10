import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JwtAccessTokenDto } from "../../dto";
import type { Request } from "express";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, "jwt-access") {
  public constructor() {
    super({
      jwtFromRequest: (req: Request) => req.cookies["dyf-jwt-access-token"],
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  public validate(payload: JwtAccessTokenDto) {
    return payload;
  }
}
