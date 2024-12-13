import { IsEmail } from "class-validator";

export class PasswordResetDto {
  @IsEmail()
  public email: string;
}
