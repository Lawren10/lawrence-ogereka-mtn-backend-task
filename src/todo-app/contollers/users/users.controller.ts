/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  LoginUserDetails,
  RegisterUserDetails,
} from 'src/todo-app/Dtos/users.dto';
import { UsersService } from 'src/todo-app/service/users/users.service';
import { AuthenticateGuard } from 'src/todo-app/auth/guards/auth.guard';
import { Request, Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';
import { JwtGuard } from 'src/todo-app/auth/guards/jwtRoute.guard';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body() userDetails: RegisterUserDetails,
    @Res() res: Response,
  ) {
    const insertResponse = await this.usersService.registerUser(userDetails);
    if (insertResponse.inserted) {
      return res.status(HttpStatus.OK).json(insertResponse);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json(insertResponse);
    }
  }

  @Post('login')
  @UseGuards(AuthenticateGuard)
  async loginUser(@Body() userDetails: LoginUserDetails, @Res() res: Response) {
    const authToken = await this.usersService.grantUserAccess(userDetails);

    return res.status(HttpStatus.OK).json({
      success: true,
      authToken,
      message:
        'attach the authToken to the request header auth field for future authentication',
    });
  }

  @Get('logout')
  @ApiProperty({
    type: 'string',
    description:
      'logout the current user but note, you have to remove the auth token from the client side to prevent future authentication',
  })
  logOutUser(@Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'User logged out successfully' });
  }

  @ApiProperty()
  @Get('todos')
  @UseGuards(JwtGuard)
  async getAllTodos(@Req() req: Request, @Res() res: Response) {
    const userId = req.user['id'];
    const todos = await this.usersService.retrieveAllUserTodos(userId);
    if (todos) {
      return res.status(HttpStatus.OK).json({
        success: true,
        todos,
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'No todos found for this user ',
      });
    }
  }
}
