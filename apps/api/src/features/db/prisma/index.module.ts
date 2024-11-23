import { Module } from "@nestjs/common";
import { PrismaService } from "./index.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
