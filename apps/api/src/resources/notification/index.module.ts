import { Module } from "@nestjs/common";
import { NotificationController } from "./index.controller";
import { NotificationService } from "./index.service";
import { PrismaModule } from "../db/prisma/index.module";
import { UserModule } from "../user/index.module";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
