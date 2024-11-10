export interface SignInDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}
export interface SignInResultDto {
  sessionId: string;
}
