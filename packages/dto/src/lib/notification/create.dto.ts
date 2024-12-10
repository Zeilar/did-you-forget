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
  public email?: boolean | null;

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  @IsString({ each: true })
  public reminders?: string[];

  @IsOptional()
  @Validate(RepeatValidator)
  public repeat?: number[];

  @IsDateString()
  public time: string;

  @MinLength(3)
  @MaxLength(30)
  @IsString()
  public title: string;
}
