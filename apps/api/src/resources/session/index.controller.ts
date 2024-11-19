import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { SessionService } from "./index.service";
import type { SessionForUserDto, SessionsForUserDto } from "@did-you-forget/dto";
import { AuthGuard } from "../../common/guards";
import { SessionId } from "../../common/decorators";
import { UserService } from "../user/index.service";

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
    const { id } = await this.userService.getUserBySessionId(sessionId);
    const sessions = await this.sessionService.getSessionsForUser(id);
    return {
      sessions: sessions.map(
        (session) => ({ ...session, current: session.id === sessionId } satisfies SessionForUserDto)
      ),
    };
  }
}
