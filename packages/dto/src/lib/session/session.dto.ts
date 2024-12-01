import type { Session } from "@prisma/client";
import { IsDateString, IsIP, IsOptional, IsUUID } from "class-validator";

export class SessionDto implements Session {
  @IsUUID("4")
  id: string;

  @IsOptional()
  @IsDateString()
  expires: Date;

  @IsOptional()
  @IsIP()
  ipAddress: string | null;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsUUID("4")
  userId: string;
}
