import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../index.service";
import { SignInDto, SignInResultDto } from "../dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  public constructor(private authService: AuthService) {
    super();
  }

  public validate(signInDto: SignInDto): Promise<SignInResultDto> {
    return this.authService.signIn(signInDto);
  }
}
