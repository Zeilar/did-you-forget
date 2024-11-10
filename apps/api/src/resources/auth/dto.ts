import { Prisma } from "@prisma/client";

export type SignInDto = Pick<Prisma.UserCreateInput, "email" | "password">;
export type SignInReturnDto = { accessToken: string };
export type JwtPayloadDto = Pick<Prisma.UserCreateInput, "id" | "email">;
export type VerifyTokenDto = { accessToken: string };
