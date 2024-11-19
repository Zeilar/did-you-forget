import { Module } from "@nestjs/common";
import { SessionController } from "./index.controller";
import { SessionService } from "./index.service";
import { PrismaModule } from "../db/prisma/index.module";
import { AuthModule } from "../auth/index.module";
import { UserModule } from "../user/index.module";

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
