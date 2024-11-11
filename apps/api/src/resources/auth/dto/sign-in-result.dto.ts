import { IsUUID } from "class-validator";

interface SignInResultDtoImplementation {
  sessionId: string;
}

export class SignInResultDto implements SignInResultDtoImplementation {
  @IsUUID("4")
  sessionId: string;
}
