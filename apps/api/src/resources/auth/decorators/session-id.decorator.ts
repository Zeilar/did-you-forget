import { createParamDecorator, UnauthorizedException, type ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const SessionId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ParameterDecorator => {
    const req: Request | undefined = ctx?.switchToHttp().getRequest();
    const sessionId = req?.cookies["dyf-session"];
    if (!sessionId) {
      throw new UnauthorizedException("Session cookie not found.");
    }
    return sessionId;
  }
);
