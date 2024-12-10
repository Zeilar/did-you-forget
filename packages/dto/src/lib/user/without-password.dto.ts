import type { User } from "@prisma/client";
import { IsBoolean, IsDateString, IsEmail, IsUUID } from "class-validator";

export class UserWithoutPasswordDto implements Omit<User, "password"> {
  @IsUUID("4")
  public id: string;

  @IsEmail()
  public email: string;

  @IsBoolean()
  public isVerified: boolean;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
  public updatedAt: Date;
}
