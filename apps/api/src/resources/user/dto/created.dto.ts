import { IsDate, IsEmail, IsUUID } from "class-validator";
import { UserWithoutPasswordDto } from "../dto";

export class CreatedUserDto implements Omit<UserWithoutPasswordDto, "notifications"> {
  @IsUUID("4")
  id: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
