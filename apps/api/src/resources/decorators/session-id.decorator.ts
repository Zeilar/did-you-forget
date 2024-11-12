import { createParamDecorator, UnauthorizedException, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import config from "../../config";

export const SessionId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ParameterDecorator => {
    const req: Request | undefined = ctx?.switchToHttp().getRequest();
    const sessionId = req?.cookies[config().sessionCookieName];
    if (!sessionId) {
      throw new UnauthorizedException("Session cookie not found.");
    }
    return sessionId;
  }
);
