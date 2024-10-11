import { Body, Controller, Get, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/book.schema';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import {
  ErrorObject,
  createUserDto,
  userLoginDto,
  userReposeDto,
} from './userDto';

@Controller('user')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(NoFilesInterceptor())
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getAllUsers')
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('register')
  async createUser(
    @Body() createUserDto: createUserDto,
  ): Promise<User | ErrorObject> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() user: userLoginDto): Promise<userReposeDto> {
    return this.userService.login(user);
  }
}
