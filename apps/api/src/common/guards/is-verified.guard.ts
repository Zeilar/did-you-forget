import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from "@nestjs/common";
import type { Request } from "express";
import { PrismaService } from "../../features/db/prisma/index.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class IsVerifiedGuard implements CanActivate {
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
    const session = await this.prismaService.session.findFirst({
      where: { id: sessionId, expires: { gt: new Date() } },
    });
    const user = await this.prismaService.user.findFirst({ where: { id: session?.userId } });
    return !!user?.isVerified && !!session;
  }
}
