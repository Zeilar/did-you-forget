import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  public async migrate(): Promise<void> {
    try {
      await execAsync("yarn prisma migrate deploy");
      Logger.log("Applied migrations", this.constructor.name);
    } catch (error) {
      Logger.error(`Error running migrations: ${error}`, this.constructor.name);
      Logger.log("Closing app", this.constructor.name);
      process.exit(1);
    }
  }
}
