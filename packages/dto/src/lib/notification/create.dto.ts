import type { Prisma } from "@prisma/client";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { RepeatValidator } from "./validation";

export class CreateNotificationDto
  implements Omit<Prisma.NotificationCreateInput, "id" | "createdAt" | "updatedAt" | "user">
{
  @IsOptional()
  @IsBoolean()
  email?: boolean | null;

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  @IsString({ each: true })
  reminders?: string[];

  @IsOptional()
  @Validate(RepeatValidator)
  repeat?: number[];

  @IsDateString()
  time: string;

  @MinLength(3)
  @MaxLength(30)
  @IsString()
  title: string;
}
