import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from "@nestjs/common";
import { SessionService } from "./index.service";
import type {
  DeletedSessionsDto,
  SessionForUserDto,
  SessionsForUserDto,
} from "@did-you-forget/dto";
import { AuthGuard } from "../../common/guards";
import { SessionId } from "../../common/decorators";
import { UserService } from "../user/index.service";
import { isArray } from "class-validator";

@Controller("/session")
export class SessionController {
  public constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get("/")
  public async getSessions(@SessionId() sessionId: string): Promise<SessionsForUserDto> {
    const { id } = await this.userService.getBySessionId(sessionId);
    const sessions = await this.sessionService.getSessionsForUser(id);
    return {
      sessions: sessions.map(
        (session) => ({ ...session, current: session.id === sessionId } satisfies SessionForUserDto)
      ),
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete("/delete")
  /**
   * Should be used for single deletions also.
   */
  public async deleteSessions(
    @SessionId() sessionId: string,
    @Query("ids") ids: string
  ): Promise<DeletedSessionsDto> {
    const parsedIds = ids.split(",");
    if (!isArray(parsedIds) || !parsedIds.every(Boolean)) {
      throw new BadRequestException(
        `ids must be a comma separated string that starts and ends with an id.`
      );
    }
    const { id } = await this.userService.getBySessionId(sessionId);
    const deletedSessions = await this.sessionService.deleteSessions(parsedIds, id);
    return { deletedSessions };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("/all")
  public async deleteAllSessionsForUser(@SessionId() sessionId: string): Promise<void> {
    const { id } = await this.userService.getBySessionId(sessionId);
    await this.sessionService.deleteAllSessionsForUser(id);
  }
}
