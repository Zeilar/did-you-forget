import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { PrismaService } from "../db/prisma/index.service";
import type { JwtPayloadDto, SignInDto, SignInReturnDto } from "./dto";

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  public async signIn({ email, password }: SignInDto): Promise<SignInReturnDto> {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException();
    }
    if (!(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException();
    }
    const accessToken = await this.jwtService.signAsync({
      email,
      id: user.id,
    } satisfies JwtPayloadDto);
    return { accessToken };
  }

  private comparePassword(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }
}
