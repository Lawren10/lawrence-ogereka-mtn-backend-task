import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { loginUserDetails } from '../utils/types/user.types';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  authenticateUser(userDetails: loginUserDetails) {
    console.log('authenicate users', userDetails);
  }
}
