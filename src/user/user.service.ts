import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ErrorObject, userReposeDto, createUserDto } from './userDto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = this.userModel.find();
    return users;
  }

  async create(userPayload: createUserDto): Promise<User | ErrorObject> {
    const hashedPassword = await bcrypt.hash(userPayload.password, 10); // Hash the password
    const newUser = new this.userModel({
      ...userPayload,
      password: hashedPassword, // Set the hashed password
    });

    try {
      await newUser.save();
      const responseUser = newUser.toObject();
      delete responseUser.password;
      return responseUser;
    } catch (error) {
      // Check for duplicate key errors
      if (error.code === 11000) {
        const field = error.keyValue.username ? 'username' : 'email';
        return {
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
        };
      }
      return { message: 'An error occurred while creating the user' };
    }
  }

  async login(userPayload: {
    username: string;
    password: string;
  }): Promise<userReposeDto> {
    // Find the user by username
    const user = await this.userModel.findOne({
      username: userPayload.username,
    });
    console.log('found User', userPayload.username);
    // Check if the user exists and compare passwords
    if (user && (await bcrypt.compare(userPayload.password, user.password))) {
      const responseUser = user.toObject();
      delete responseUser.password;
      return responseUser;
    } else {
      throw new UnauthorizedException('Invalid user credentials');
    }
  }
}
