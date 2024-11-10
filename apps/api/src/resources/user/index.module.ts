import { Module } from "@nestjs/common";
import { UserController } from "./index.controller";
import { UserService } from "./index.service";
import { PrismaModule } from "../db/prisma/index.module";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
