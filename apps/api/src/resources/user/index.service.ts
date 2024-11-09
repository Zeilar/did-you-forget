import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma/index.service";
import type { CreatedUserDto, RegisterUserDto } from "./dto";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createUser({ email, password }: RegisterUserDto): Promise<CreatedUserDto> {
    console.log("register with", { email, password });
    const { password: hashedPassword, ...user } = await this.prismaService.user.create({
      data: { email, password: await this.hashPassword(password) },
    });
    return user;
  }

  public hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
}
