import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/index.module";
import cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "./features/db/prisma/index.service";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  const port = configService.getOrThrow("port");
  const globalPrefix = configService.getOrThrow("globalPrefix");
  const env = configService.getOrThrow("env");

  if (env === "production") {
    await execAsync("yarn prisma generate");
    await prismaService.migrate();
  }

  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })
    )
    .use(cookieParser())
    .enableCors({ origin: configService.getOrThrow("cors"), credentials: true });
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}/${globalPrefix}`);
}

bootstrap();
