import type { User } from "@prisma/client";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class EditUserDto implements Partial<Pick<User, "email" | "password">> {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  password?: string;
}
