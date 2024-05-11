import { Injectable } from '@nestjs/common';
import { loginUserDetails } from '../utils/types/user.types';
import { UsersService } from '../service/users/users.service';

/**
 * Authenticates a user with the provided login details.
 *
 * @param userDetails - The login details for the user.
 * @returns A Promise that resolves to the authenticated user, or rejects with an error.
 */
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async authenticateUser(userDetails: loginUserDetails) {
    return await this.userService.validateUser(userDetails);
  }
}
