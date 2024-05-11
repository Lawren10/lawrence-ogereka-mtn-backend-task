import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDetails {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'username must be at least 5 characters long.' })
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/, { message: 'password cannot contain spaces.' })
  @MinLength(8, { message: 'password must be at least 8 characters long.' })
  password: string;
}

export class RegisterUserDetails {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'username must be at least 5 characters long.' })
  username: string;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'please provide a valid email, e.g example@mail.com',
    },
  )
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S+$/, { message: 'password cannot contain spaces.' })
  @MinLength(8, { message: 'password must be at least 8 characters long.' })
  password: string;
}
