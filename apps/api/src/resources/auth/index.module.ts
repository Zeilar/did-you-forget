import { Module } from "@nestjs/common";
import { AuthController } from "./index.controller";
import { AuthService } from "./index.service";
import { PrismaModule } from "../db/prisma/index.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./index.guard";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 1000 * 60 * 15, // 15 minutes.
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
