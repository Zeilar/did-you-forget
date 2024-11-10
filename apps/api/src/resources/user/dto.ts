import type { User } from "@prisma/client";

export type UserWithoutPasswordDto = Omit<User, "password">;
export type CreatedUserDto = Omit<UserWithoutPasswordDto, "notifications">;
export type RegisterUserDto = Pick<User, "email" | "password">;
