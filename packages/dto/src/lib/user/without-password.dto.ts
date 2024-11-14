import type { User } from "@prisma/client";
import { IsDate, IsEmail, IsUUID } from "class-validator";

export class UserWithoutPasswordDto implements Omit<User, "password"> {
  @IsUUID("4")
  id: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
