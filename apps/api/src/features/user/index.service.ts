import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../db/prisma/index.service";
import type {
  CreatedUserDto,
  EditUserDto,
  RegisterUserDto,
  UserWithoutPasswordDto,
} from "@did-you-forget/dto";
import { hash } from "bcrypt";
import { MailjetService } from "../mailjet/index.service";

@Injectable()
export class UserService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailjetService: MailjetService
  ) {}

  public async create({ email, password }: RegisterUserDto): Promise<CreatedUserDto> {
    if (await this.isEmailTaken(email)) {
      throw new ConflictException(`The email ${email} is taken.`);
    }
    const { password: hashedPassword, ...user } = await this.prismaService.user.create({
      data: { email, password: await this.hash(password) },
    });
    return user;
  }

  private hash(password: string): Promise<string> {
    return hash(password, 10);
  }

  private async isEmailTaken(email: string): Promise<boolean> {
    const count = await this.prismaService.user.count({ where: { email } });
    return count > 0;
  }

  public async profile(id: string): Promise<UserWithoutPasswordDto> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    const { password, ...rest } = user;
    return rest;
  }

  public async getBySessionId(id: string): Promise<UserWithoutPasswordDto> {
    const session = await this.prismaService.session.findFirst({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Session with id ${id} not found.`);
    }
    const user = await this.prismaService.user.findFirst({ where: { id: session.userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${session.userId} not found.`);
    }
    const { password, ...rest } = user;
    return rest;
  }

  public async edit(id: string, { email, password }: EditUserDto): Promise<UserWithoutPasswordDto> {
    if (!email && !password) {
      throw new BadRequestException("No fields were filled.");
    }
    const { password: hashedPassword, ...user } = await this.prismaService.user.update({
      data: {
        email,
        password: password ? await this.hash(password) : undefined,
      },
      where: { id },
    });
    return user;
  }

  public async verify(pendingVerificationId: string): Promise<void> {
    const pendingVerification = await this.prismaService.pendingVerification.findFirst({
      where: { id: pendingVerificationId, expires: { gt: new Date() } },
    });
    if (!pendingVerification) {
      throw new NotFoundException(
        `Verification with id ${pendingVerificationId} doesn't exist, or is expired.`
      );
    }
    await this.prismaService.user.update({
      where: { id: pendingVerification.userId, isVerified: false },
      data: { isVerified: true },
    });
    await this.prismaService.pendingVerification.delete({ where: { id: pendingVerification.id } });
  }

  public async sendVerificationCode(email: string): Promise<void> {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    const userId = user.id;
    await this.prismaService.pendingVerification.deleteMany({ where: { userId } });
    const { id } = await this.prismaService.pendingVerification.create({
      data: { expires: new Date(Date.now() + 1000 * 60 * 5), user: { connect: { id: userId } } },
    });
    await this.mailjetService.sendMail(
      { email, name: email },
      "Verify your account",
      `Use id: ${id}`
    );
  }
}
