import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { NotificationService } from "./index.service";
import type { CreateNotificationDto, NotificationDto, NotificationsForUserDto } from "./dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { SessionId } from "../decorators/session-id.decorator";
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
  ): Promise<NotificationDto> {
    const { id } = await this.userService.getUserBySessionId(sessionId);
    return this.notificationService.createNotification(id, createNotificationDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch("/edit/:id")
  public async editNotification(
    @SessionId() sessionId: string,
    @Body() createNotificationDto: CreateNotificationDto,
    @Param("id") id: string
  ): Promise<NotificationDto> {
    const { id: userId } = await this.userService.getUserBySessionId(sessionId);
    return this.notificationService.editNotification(id, userId, createNotificationDto);
  }
}
