import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "./index.controller";
import { AppService } from "./index.service";
import { UserModule } from "../resources/user/index.module";
import { AuthModule } from "../resources/auth/index.module";
import { NotificationModule } from "../resources/notification/index.module";

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, NotificationModule],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
