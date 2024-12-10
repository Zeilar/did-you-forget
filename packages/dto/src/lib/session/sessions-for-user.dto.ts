import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SessionForUserDto } from "./session-for-user.dto";

export class SessionsForUserDto {
  @ValidateNested({ each: true })
  @Type(() => SessionForUserDto)
  public sessions: SessionForUserDto[];
}
