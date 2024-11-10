import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma/index.service";
import type { Notification } from "@prisma/client";
import { CreateNotificationDto } from "./dto";

@Injectable()
export class NotificationService {
  public constructor(private readonly prismaService: PrismaService) {}

  public getNotificationByUserId(userId: string): Promise<Notification[]> {
    return this.prismaService.notification.findMany({ where: { userId } });
  }

  public createNotification(userId: string, createNotificationDto: CreateNotificationDto) {
    return this.prismaService.notification.create({
      data: { user: { connect: { id: userId } }, ...createNotificationDto },
    });
  }
}
