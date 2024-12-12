import {
  BadRequestException,
  ConflictException,
  Inject,
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
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailjetService: MailjetService,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  public async create({ email, password }: RegisterUserDto): Promise<CreatedUserDto> {
    if (await this.isEmailTaken(email)) {
      throw new ConflictException(`The email ${email} is taken.`);
    }
    const { password: hashedPassword, ...user } = await this.prismaService.user.create({
      data: { email, password: await this.hash(password) },
    });
    await this.sendVerificationCode(user.id, user.email);
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
    if (email && (await this.isEmailTaken(email))) {
      throw new ConflictException(`The email ${email} is taken.`);
    }
    const { password: hashedPassword, ...user } = await this.prismaService.user.update({
      data: {
        email,
        password: password ? await this.hash(password) : undefined,
        isVerified: email ? false : undefined, // If user changes emails, they have to verify their email anew.
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

  public async sendVerificationCode(userId: string, email: string): Promise<void> {
    await this.prismaService.pendingVerification.deleteMany({ where: { userId } });
    const { id } = await this.prismaService.pendingVerification.create({
      data: {
        expires: new Date(
          Date.now() + parseInt(this.configService.getOrThrow("pendingVerificationExpires"))
        ),
        user: { connect: { id: userId } },
      },
    });
    const href = `${this.configService.getOrThrow("cors")}/verify/${id}`;
    await this.mailjetService.sendMail(
      { email, name: email },
      "Verify your account",
      `
        <div>
          <p>
            Hello and thank you for using the app!
            Click this link to verify your account and start using the app: <a href=${href}>${href}</a>
          </p>
          <p>This link will expire shortly.</p>
        </div>
        <br />
        <div>
          <p>If you didn't make this request, kindly ignore this mail.</p>
        </div>
      `.trim()
    );
  }
}
