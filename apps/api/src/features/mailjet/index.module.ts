import { Module } from "@nestjs/common";
import { MailjetService } from "./index.service";

@Module({
  providers: [MailjetService],
  exports: [MailjetService],
})
export class MailjetModule {}
