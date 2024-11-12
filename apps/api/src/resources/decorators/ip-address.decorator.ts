import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { Request } from "express";

/**
 * Variable should be typed as `string | undefined`.
 */
export const IpAddress = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const req: Request | undefined = ctx?.switchToHttp().getRequest();
    return req?.ip;
  }
);
