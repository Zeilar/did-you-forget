import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const IpAddress = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const req: Request | undefined = ctx?.switchToHttp().getRequest();
    return req?.ip;
  }
);
