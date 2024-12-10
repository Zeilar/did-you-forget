import type { Notification } from "@prisma/client";
import {
  IsArray,
  IsBoolean,
  IsDateString,
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
  public id: string;

  @IsOptional()
  @IsBoolean()
  public email: boolean | null;

  @IsArray()
  @IsString({ each: true })
  public reminders: string[];

  @Validate(RepeatValidator)
  public repeat: number[];

  @MinLength(3)
  @MaxLength(30)
  @IsString()
  public title: string;

  @IsDateString()
  public time: Date;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
  public updatedAt: Date;

  @IsUUID("4")
  public userId: string;
}
