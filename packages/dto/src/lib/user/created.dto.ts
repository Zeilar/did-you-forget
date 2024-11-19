import { IsDateString, IsEmail, IsUUID } from "class-validator";
import { UserWithoutPasswordDto } from "./without-password.dto";

export class CreatedUserDto implements Omit<UserWithoutPasswordDto, "notifications"> {
  @IsUUID("4")
  id: string;

  @IsEmail()
  email: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
