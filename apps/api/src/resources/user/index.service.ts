import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma/index.service";
import type { CreatedUserDto, RegisterUserDto } from "./dto";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createUser({ email, password }: RegisterUserDto): Promise<CreatedUserDto> {
    if (await this.isEmailTaken(email)) {
      throw new ConflictException("That email is taken.");
    }
    const { password: hashedPassword, ...user } = await this.prismaService.user.create({
      data: { email, password: await this.hashPassword(password) },
    });
    return user;
  }

  private hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  private async isEmailTaken(email: string): Promise<boolean> {
    const count = await this.prismaService.user.count({ where: { email } });
    return count > 0;
  }
}
