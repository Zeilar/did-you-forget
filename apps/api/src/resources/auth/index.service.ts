import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { PrismaService } from "../db/prisma/index.service";
import type { JwtAccessTokenDto, SignInDto, SignInReturnDto } from "./dto";

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  public async signIn({ email, password }: SignInDto): Promise<SignInReturnDto> {
    const { id } = await this.validateUser({ email, password });
    const accessToken = await this.generateAccessToken({ email, id } satisfies JwtAccessTokenDto);
    const refreshToken = await this.generateRefreshToken({ email, id } satisfies JwtAccessTokenDto);
    return { accessToken, refreshToken };
  }

  private comparePassword(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }

  public async validateUser({ email, password }: SignInDto) {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${JSON.stringify(email)} not found.`);
    }
    if (!(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException("Password does not match.");
    }
    return user;
  }

  public generateRefreshToken({ iat, exp, ...payload }: JwtAccessTokenDto): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: "7d",
    });
  }

  public generateAccessToken({ iat, exp, ...payload }: JwtAccessTokenDto): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: "15m",
    });
  }
}
