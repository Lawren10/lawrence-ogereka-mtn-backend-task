import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUserDetails } from 'src/todo-app/Dtos/users.dto';
import { UsersService } from 'src/todo-app/service/users/users.service';
import { AuthenticateGuard } from 'src/todo-app/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  @UseGuards(AuthenticateGuard)
  loginUser(@Body() userDetails: LoginUserDetails) {
    console.log('userDetails', userDetails);
  }

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }
}
