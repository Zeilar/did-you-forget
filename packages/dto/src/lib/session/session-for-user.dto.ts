import type { Session } from "@prisma/client";
import { IsBoolean, IsDateString, IsIP, IsOptional, IsUUID } from "class-validator";

interface SessionForUserDtoImplementation extends Session {
  current: boolean;
}

export class SessionForUserDto implements SessionForUserDtoImplementation {
  @IsUUID("4")
  id: string;

  @IsOptional()
  @IsDateString()
  expires: Date | null;

  @IsOptional()
  @IsIP()
  ipAddress: string | null;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsUUID("4")
  userId: string;

  @IsBoolean()
  current: boolean;
}
