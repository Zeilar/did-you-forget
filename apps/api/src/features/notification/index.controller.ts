import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { NotificationService } from "./index.service";
import type {
  CreateNotificationDto,
  DeletedNotificationsDto,
  EditNotificationDto,
  NotificationDto,
  NotificationsForUserDto,
} from "@did-you-forget/dto";
import { AuthGuard } from "../../common/guards/auth.guard";
import { SessionId } from "../../common/decorators/session-id.decorator";
import { UserService } from "../user/index.service";
import { isArray } from "class-validator";

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
    const { id } = await this.userService.getBySessionId(sessionId);
    return {
      notifications: await this.notificationService.getNotificationsByUserId(id),
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post("/")
  public async createNotification(
    @SessionId() sessionId: string,
    @Body() createNotificationDto: CreateNotificationDto
  ): Promise<NotificationDto> {
    const { id } = await this.userService.getBySessionId(sessionId);
    return this.notificationService.createNotification(id, createNotificationDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch("/edit/:id")
  public async editNotification(
    @SessionId() sessionId: string,
    @Body() editNotificationDto: EditNotificationDto,
    @Param("id") id: string
  ): Promise<NotificationDto> {
    const { id: userId } = await this.userService.getBySessionId(sessionId);
    return this.notificationService.editNotification(id, userId, editNotificationDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete("/")
  /**
   * Should be used for single deletions also.
   */
  public async deleteNotifications(
    @SessionId() sessionId: string,
    @Query("ids") ids: string
  ): Promise<DeletedNotificationsDto> {
    const parsedIds = ids.split(",");
    if (!isArray(parsedIds) || !parsedIds.every(Boolean)) {
      throw new BadRequestException(
        `ids must be a comma separated string that starts and ends with an id.`
      );
    }
    const { id } = await this.userService.getBySessionId(sessionId);
    const deletedNotifications = await this.notificationService.deleteNotifications(parsedIds, id);
    return { deletedNotifications };
  }
}
