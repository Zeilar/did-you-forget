import { createParamDecorator, UnauthorizedException, type ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request: Express.Request | undefined = ctx?.switchToHttp().getRequest();
  if (!request?.user) {
    throw new UnauthorizedException("req.user not found.");
  }
  return request.user.id;
});
