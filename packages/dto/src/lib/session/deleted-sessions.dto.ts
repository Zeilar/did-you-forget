import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SessionDto } from "./session.dto";

export class DeletedSessionsDto {
  @ValidateNested({ each: true })
  @Type(() => SessionDto)
  public deletedSessions: SessionDto[];
}
