import { Prisma } from "@prisma/client";

export type CreatedUserDto = Omit<Prisma.UserCreateInput, "password" | "notifications">;
export type RegisterUserDto = Pick<Prisma.UserCreateInput, "email" | "password">;
