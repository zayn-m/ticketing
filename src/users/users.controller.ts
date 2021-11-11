import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private userService: UsersService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async registerUser(@Body() userDto: RegisterUserDto, @Res() res: Response) {
    this.logger.verbose(`Registering user with email ${userDto.email}`);
    const user = await this.userService.registerUser(userDto);
    res.status(HttpStatus.CREATED).json({ data: user });
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async loginUser(@Body() userDto: LoginUserDto, @Res() res: Response) {
    this.logger.verbose(`Logging in user with email ${userDto.email}`);
    const user = await this.userService.loginUser(userDto);
    res.status(HttpStatus.CREATED).json({ data: user });
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
