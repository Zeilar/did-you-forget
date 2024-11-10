import { Module } from "@nestjs/common";
import { AuthController } from "./index.controller";
import { AuthService } from "./index.service";
import { PrismaModule } from "../db/prisma/index.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtAccessTokenStrategy } from "./strategies/jwt/access-token.strategy";
import { JwtRefreshTokenStrategy } from "./strategies/jwt/refresh-token.strategy";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({ global: true, secret: process.env.JWT_ACCESS_TOKEN_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
