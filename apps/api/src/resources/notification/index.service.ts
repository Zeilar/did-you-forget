import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../db/prisma/index.service";
import type { Notification } from "@prisma/client";
import { CreateNotificationDto, EditNotificationDto, NotificationDto } from "./dto";

@Injectable()
export class NotificationService {
  public constructor(private readonly prismaService: PrismaService) {}

  public getNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.prismaService.notification.findMany({ where: { userId } });
  }

  public createNotification(
    userId: string,
    createNotificationDto: CreateNotificationDto
  ): Promise<Notification> {
    return this.prismaService.notification.create({
      data: { user: { connect: { id: userId } }, ...createNotificationDto },
    });
  }

  public async editNotification(
    id: string,
    userId: string,
    editNotificationDto: EditNotificationDto
  ): Promise<Notification> {
    const notification = await this.prismaService.notification.findFirst({ where: { id } });
    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found.`);
    }
    if (notification.userId !== userId) {
      throw new ForbiddenException();
    }
    return this.prismaService.notification.update({
      where: { id, userId },
      data: editNotificationDto,
    });
  }

  public async deleteNotifications(
    notificationIds: string[],
    userId: string
  ): Promise<NotificationDto[]> {
    const deletedNotifications = await Promise.all(
      notificationIds.map(async (id) => {
        const count = await this.prismaService.notification.count({ where: { id, userId } });
        return count ? this.prismaService.notification.delete({ where: { id, userId } }) : null;
      })
    );
    return deletedNotifications.filter((deletedNotification) => deletedNotification !== null);
  }
}
