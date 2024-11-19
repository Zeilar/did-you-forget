import type { User } from "@prisma/client";
import { IsDateString, IsEmail, IsUUID } from "class-validator";

export class UserWithoutPasswordDto implements Omit<User, "password"> {
  @IsUUID("4")
  id: string;

  @IsEmail()
  email: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
