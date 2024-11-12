import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../db/prisma/index.service";
import type { CreatedUserDto, EditUserDto, RegisterUserDto, UserWithoutPasswordDto } from "./dto";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createUser({ email, password }: RegisterUserDto): Promise<CreatedUserDto> {
    if (await this.isEmailTaken(email)) {
      throw new ConflictException(`The email ${JSON.stringify(email)} is taken.`);
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

  public async profile(id: string): Promise<UserWithoutPasswordDto> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${JSON.stringify(id)} not found.`);
    }
    const { password, ...rest } = user;
    return rest;
  }

  public async getUserBySessionId(id: string): Promise<UserWithoutPasswordDto> {
    const session = await this.prismaService.session.findFirst({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Session with id ${JSON.stringify(id)} not found.`);
    }
    const user = await this.prismaService.user.findFirst({ where: { id: session.userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${JSON.stringify(session.userId)} not found.`);
    }
    const { password, ...rest } = user;
    return rest;
  }

  public async editUser(
    id: string,
    { email, password }: EditUserDto
  ): Promise<UserWithoutPasswordDto> {
    if (!email && !password) {
      throw new BadRequestException("No fields were filled.");
    }
    const { password: hashedPassword, ...user } = await this.prismaService.user.update({
      data: {
        email,
        password: password ? await this.hashPassword(password) : undefined,
      },
      where: { id },
    });
    return user;
  }
}
