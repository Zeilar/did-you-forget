import type { Notification, Prisma } from "@prisma/client";

export interface NotificationsForUserDto {
  notifications: Notification[];
}
export interface CreateNotificationResultDto {
  notification: Notification;
}
export type CreateNotificationDto = Omit<
  Prisma.NotificationCreateInput,
  "id" | "createdAt" | "updatedAt" | "user"
>;
