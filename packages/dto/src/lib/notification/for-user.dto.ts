import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { NotificationDto } from "./notification.dto";

export class NotificationsForUserDto {
  @ValidateNested({ each: true })
  @Type(() => NotificationDto)
  public notifications: NotificationDto[];
}
