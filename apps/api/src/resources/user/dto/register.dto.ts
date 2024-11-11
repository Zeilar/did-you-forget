import type { User } from "@prisma/client";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterUserDto implements Pick<User, "email" | "password"> {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}
