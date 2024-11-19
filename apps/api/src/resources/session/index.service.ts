import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma/index.service";
import type { Session } from "@prisma/client";

@Injectable()
export class SessionService {
  public constructor(private readonly prismaService: PrismaService) {}

  public getSessionsForUser(userId: string): Promise<Session[]> {
    return this.prismaService.session.findMany({ where: { userId } });
  }

  public async deleteSessions(sessionIds: string[], userId: string): Promise<Session[]> {
    const deletedSessions = await Promise.all(
      sessionIds.map(async (id) => {
        const count = await this.prismaService.session.count({ where: { id, userId } });
        return count ? this.prismaService.session.delete({ where: { id, userId } }) : null;
      })
    );
    return deletedSessions.filter((deletedNotification) => deletedNotification !== null);
  }

  public async deleteAllSessionsForUser(userId: string): Promise<void> {
    await this.prismaService.session.deleteMany({ where: { userId } });
  }
}
