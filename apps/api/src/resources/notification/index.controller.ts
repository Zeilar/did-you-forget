import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { NotificationService } from "./index.service";
import type {
  CreateNotificationDto,
  CreateNotificationResultDto,
  NotificationsForUserDto,
} from "./dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { SessionId } from "../auth/decorators/session-id.decorator";
import { UserService } from "../user/index.service";

@Controller("/notification")
export class NotificationController {
  public constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get("/")
  public async getNotificationsForUser(
    @SessionId() sessionId: string
  ): Promise<NotificationsForUserDto> {
    const { id } = await this.userService.getUserBySessionId(sessionId);
    return {
      notifications: await this.notificationService.getNotificationsByUserId(id),
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post("/create")
  public async createNotification(
    @SessionId() sessionId: string,
    @Body() createNotificationDto: CreateNotificationDto
  ): Promise<CreateNotificationResultDto> {
    const { id } = await this.userService.getUserBySessionId(sessionId);
    const notification = await this.notificationService.createNotification(
      id,
      createNotificationDto
    );
    return { notification };
  }
}
