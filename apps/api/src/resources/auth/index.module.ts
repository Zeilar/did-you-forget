import { Module } from "@nestjs/common";
import { AuthController } from "./index.controller";
import { AuthService } from "./index.service";
import { PrismaModule } from "../db/prisma/index.module";
import { AuthGuard } from "../guards/auth.guard";

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
