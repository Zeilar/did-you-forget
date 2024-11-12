import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { NotificationDto } from "./notification.dto";

export class DeletedNotificationsDto {
  @ValidateNested({ each: true })
  @Type(() => NotificationDto)
  deletedNotifications: NotificationDto[];
}
