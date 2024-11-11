import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/index.module";
import cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix).useGlobalPipes(new ValidationPipe()).use(cookieParser());
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow("port");
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}/${globalPrefix}`);
}

bootstrap();
