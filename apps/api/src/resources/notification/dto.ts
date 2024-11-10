import type { Notification, Prisma, User } from "@prisma/client";

export type UserWithoutPasswordDto = Omit<User, "password">;
export type CreatedUserDto = Omit<UserWithoutPasswordDto, "notifications">;
export type RegisterUserDto = Pick<User, "email" | "password">;
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
