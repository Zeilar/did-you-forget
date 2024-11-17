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

export class CreateNotificationDto
  implements Omit<Prisma.NotificationCreateInput, "id" | "createdAt" | "updatedAt" | "user">
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

  @IsDate()
  time: Date;

  @MinLength(3)
  @MaxLength(30)
  @IsString()
  title: string;
}
