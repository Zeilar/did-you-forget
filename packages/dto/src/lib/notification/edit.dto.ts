import type { Prisma } from "@prisma/client";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { RepeatValidator } from "./validation";

export class EditNotificationDto
  implements Omit<Prisma.NotificationUpdateInput, "id" | "createdAt" | "updatedAt" | "user">
{
  @IsOptional()
  @IsBoolean()
  email?: boolean | null;

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  @IsInt({ each: true })
  reminders?: number[];

  @IsOptional()
  @Validate(RepeatValidator)
  repeat?: number[];

  @IsOptional()
  @IsDate()
  time?: Date;

  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  @IsString()
  title?: string;
}
