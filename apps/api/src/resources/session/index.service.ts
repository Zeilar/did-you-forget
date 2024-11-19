import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma/index.service";
import type { Session } from "@prisma/client";

@Injectable()
export class SessionService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getSessionsForUser(userId: string): Promise<Session[]> {
    return this.prismaService.session.findMany({ where: { userId } });
  }
}
