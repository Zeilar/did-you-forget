import { IsBoolean, IsDateString, IsEmail, IsUUID } from "class-validator";
import { UserWithoutPasswordDto } from "./without-password.dto";

export class CreatedUserDto implements Omit<UserWithoutPasswordDto, "notifications"> {
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
