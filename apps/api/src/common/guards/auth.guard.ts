import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from "@nestjs/common";
import type { Request } from "express";
import { PrismaService } from "../../resources/db/prisma/index.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const sessionId = req.cookies[this.configService.getOrThrow<string>("sessionCookie.name")];
    if (!sessionId) {
      throw new UnauthorizedException();
    }
    const sessionCount = await this.prismaService.session.count({
      where: { id: sessionId, expires: { gt: new Date() } },
    });
    return sessionCount > 0;
  }
}
