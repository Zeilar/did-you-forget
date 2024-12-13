import { IsString, IsUUID } from "class-validator";

export class PasswordResetConfirmDto {
  @IsUUID("4")
  public id: string;

  @IsString()
  public password: string;
}
