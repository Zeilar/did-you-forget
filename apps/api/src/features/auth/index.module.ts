import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./index.controller";
import { AuthService } from "./index.service";
import { PrismaModule } from "../db/prisma/index.module";
import { AuthGuard } from "../../common/guards/auth.guard";
import { MailjetModule } from "../mailjet/index.module";
import { UserModule } from "../user/index.module";

@Module({
  imports: [PrismaModule, MailjetModule, forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
