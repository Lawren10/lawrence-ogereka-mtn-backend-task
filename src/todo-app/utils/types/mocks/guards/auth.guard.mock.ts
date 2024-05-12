import { AuthenticateGuard } from 'src/todo-app/auth/guards/auth.guard';
import { JwtGuard } from 'src/todo-app/auth/guards/jwtRoute.guard';

export const mockAuthenticateGuard: AuthenticateGuard = {
  canActivate: jest.fn().mockReturnValue(true),
  logIn: jest.fn(),
  handleRequest: jest.fn(),
  getAuthenticateOptions: jest.fn(),
  getRequest: jest.fn(),
};

export const mockJwtGuard: JwtGuard = {
  canActivate: jest.fn().mockReturnValue(true),
  logIn: jest.fn(),
  handleRequest: jest.fn(),
  getAuthenticateOptions: jest.fn(),
  getRequest: jest.fn(),
};
