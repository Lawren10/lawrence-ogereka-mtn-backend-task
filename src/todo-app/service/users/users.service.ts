import { Injectable } from '@nestjs/common';
import {
  loginUserDetails,
  registerUserType,
} from 'src/todo-app/utils/types/user.types';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/todo-app/database/tables/usersTable';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  // constructor(private jwtService: JwtService) {}
  //the jwt service is used to hash the usermane and password to create the token for login users and send to the client to save for next authentication.
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userTable: Repository<User>,
  ) {}

  async registerUser({ username, email, password }: registerUserType) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = {
      username,
      email,
      password: hashedPassword,
    };

    try {
      const insertedUser = await this.userTable.save(user);
      delete insertedUser.password;
      return {
        inserted: true,
        message: 'User registered successfully',
        user: insertedUser,
      };
    } catch (error) {
      return {
        inserted: false,
        message: error.message,
      };
    }
  }

  async validateUser(userDetails: loginUserDetails) {
    const { username, password } = userDetails;

    const user = await this.userTable.findOne({ where: { username } });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      return true;
    } else {
      return false;
    }
  }

  async grantUserAccess(userDetails: loginUserDetails) {
    const { username } = userDetails;
    const user = await this.userTable.findOne({ where: { username } });
    return this.jwtService.signAsync({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }

  async retrieveAllUserTodos(userId: string) {
    console.log(userId);
    const allTodos = await this.userTable.findOne({ where: { id: userId } });
    return allTodos?.todos;
  }
}
