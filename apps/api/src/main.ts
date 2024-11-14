import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/index.module";
import cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow("port");
  const globalPrefix = configService.getOrThrow("globalPrefix");
  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    .use(cookieParser())
    .enableCors({ origin: configService.getOrThrow("cors"), credentials: true });
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}/${globalPrefix}`);
}

bootstrap();
