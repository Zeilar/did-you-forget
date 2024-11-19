import config from "../config";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../resources/user/index.module";
import { AuthModule } from "../resources/auth/index.module";
import { NotificationModule } from "../resources/notification/index.module";
import { SessionModule } from "../resources/session/index.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UserModule,
    AuthModule,
    NotificationModule,
    SessionModule,
  ],
})
export class AppModule {}
