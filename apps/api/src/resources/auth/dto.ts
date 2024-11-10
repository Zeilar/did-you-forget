import { Prisma, User } from "@prisma/client";

export type SignInDto = Pick<Prisma.UserCreateInput, "email" | "password">;
export type SignInResultDto = { accessToken: string; refreshToken: string };
export type RefreshAccessTokenDto = { accessToken: string };
export interface JwtAccessTokenDto extends Pick<User, "id" | "email"> {
  iat?: number;
  exp?: number;
  refreshToken?: string;
}
export type JwtRefreshTokenDto = Omit<JwtAccessTokenDto, "refreshToken">;
export type VerifyTokenDto = { accessToken: string };
