import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "./index.controller";
import { AppService } from "./index.service";
import { UserModule } from "../resources/user/index.module";
import { AuthModule } from "../resources/auth/index.module";

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
