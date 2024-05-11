import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  //the validateUser function will be called using the authenticate user function in the service to authenicte the user from the jwt token from the request header before handling futher operations.
  validate(username: string, password: string) {
    return this.authService.authenticateUser({ username, password });
  }
}
