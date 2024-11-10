import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { NotificationService } from "./index.service";
import { UserId } from "../user/decorators/user-id.decorator";
import type { CreateNotificationResultDto, NotificationsForUserDto } from "./dto";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("/notification")
export class NotificationController {
  public constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get("/")
  public async getNotificationsForUser(@UserId() userId: string): Promise<NotificationsForUserDto> {
    return {
      notifications: await this.notificationService.getNotificationByUserId(userId),
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post("/create")
  public async createNotification(@UserId() userId: string): Promise<CreateNotificationResultDto> {
    const notification = await this.notificationService.createNotification(userId, {
      time: new Date(),
      title: "some title",
    });
    return { notification };
  }
}
