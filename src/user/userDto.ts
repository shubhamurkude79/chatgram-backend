import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
export class createUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @Length(6, 20) // Password length validation
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class userLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}

export class ErrorObject {
  message: string;
}

export class userReposeDto {
  username: string;
  email: string;
}
