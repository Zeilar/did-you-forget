import config from "../config";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../features/user/index.module";
import { AuthModule } from "../features/auth/index.module";
import { NotificationModule } from "../features/notification/index.module";
import { SessionModule } from "../features/session/index.module";

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
