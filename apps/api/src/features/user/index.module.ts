import { Module } from "@nestjs/common";
import { UserController } from "./index.controller";
import { UserService } from "./index.service";
import { PrismaModule } from "../db/prisma/index.module";
import { AuthModule } from "../auth/index.module";
import { MailjetModule } from "../mailjet/index.module";

@Module({
  imports: [PrismaModule, AuthModule, MailjetModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
