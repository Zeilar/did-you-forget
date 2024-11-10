import { Injectable, type CanActivate, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import { PrismaService } from "../../db/prisma/index.service";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly prismaService: PrismaService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const sessionId = req.cookies["dyf-session"];
    const sessionCount = await this.prismaService.session.count({
      where: { id: sessionId, expires: { gt: new Date() } },
    });
    return sessionCount > 0;
  }
}
