import type { Notification } from "@prisma/client";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { NotificationDto } from "./notification.dto";

export class CreateNotificationResultDto {
  @ValidateNested()
  @Type(() => NotificationDto)
  notification: Notification;
}
