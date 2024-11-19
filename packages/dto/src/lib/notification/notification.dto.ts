import type { Notification } from "@prisma/client";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { RepeatValidator } from "./validation";

export class NotificationDto implements Notification {
  @IsUUID("4")
  id: string;

  @IsOptional()
  @IsBoolean()
  email: boolean | null;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  reminders: number[];

  @Validate(RepeatValidator)
  repeat: number[];

  @MinLength(3)
  @MaxLength(30)
  @IsString()
  title: string;

  @IsDateString()
  time: Date;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsUUID("4")
  userId: string;
}
