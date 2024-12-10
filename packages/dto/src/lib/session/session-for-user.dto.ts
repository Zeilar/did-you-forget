import type { Session } from "@prisma/client";
import { IsBoolean, IsDateString, IsIP, IsOptional, IsUUID } from "class-validator";

interface SessionForUserDtoImplementation extends Session {
  current: boolean;
}

export class SessionForUserDto implements SessionForUserDtoImplementation {
  @IsUUID("4")
  public id: string;

  @IsOptional()
  @IsDateString()
  public expires: Date;

  @IsOptional()
  @IsIP()
  public ipAddress: string | null;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
  public updatedAt: Date;

  @IsUUID("4")
  public userId: string;

  @IsBoolean()
  public current: boolean;
}
