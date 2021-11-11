import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoggedUser, User } from './types/user.type';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @InjectModel('User') private readonly User: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(userDto: RegisterUserDto): Promise<User> {
    const user = await this.User.findOne({ email: userDto.email });

    if (user) {
      throw new BadRequestException(
        'User is already registered with this email',
      );
    }

    return await this.User.create({
      ...userDto,
    });
  }

  async loginUser(userDto: LoginUserDto): Promise<LoggedUser> {
    const { email, password } = userDto;
    const user = await this.User.findOne({ email }).select('+password');
    if (!user) {
      this.logger.error(`User not exists with email ${email}`);
      throw new BadRequestException('Invalid provided credentials');
    }
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new BadRequestException('Invalid provided credentials');
    }

    const payload = { id: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, tokenType: 'Bearer', role: user.role };
  }
}
