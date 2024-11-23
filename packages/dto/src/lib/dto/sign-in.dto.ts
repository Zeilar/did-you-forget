import type { User } from "@prisma/client";
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

interface SignInDtoImplementation extends Partial<Pick<User, "email" | "password">> {
  rememberMe?: boolean;
}

export class SignInDto implements SignInDtoImplementation {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
