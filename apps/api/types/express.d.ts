import type { JwtAccessTokenDto } from "../src/resources/auth/dto";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtAccessTokenDto;
    }
    // eslint-disable-next-line
    export interface User extends JwtAccessTokenDto {}
  }
}
