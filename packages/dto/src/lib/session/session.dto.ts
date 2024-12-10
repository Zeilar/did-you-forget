import type { Session } from "@prisma/client";
import { IsDateString, IsIP, IsOptional, IsUUID } from "class-validator";

export class SessionDto implements Session {
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
}
