import { Module } from "@nestjs/common";
import { NotificationController } from "./index.controller";
import { NotificationService } from "./index.service";
import { PrismaModule } from "../db/prisma/index.module";

@Module({
  imports: [PrismaModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
