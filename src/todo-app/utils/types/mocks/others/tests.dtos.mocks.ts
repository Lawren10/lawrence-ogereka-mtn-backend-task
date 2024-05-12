import {
  LoginUserDetails,
  RegisterUserDetails,
} from 'src/todo-app/Dtos/users.dto';

export const mockLoginUserDetails: LoginUserDetails = {
  username: 'testUser',
  password: 'testPasswor123!',
};

export const mockRegisterUserDetails: RegisterUserDetails = {
  username: 'testUser',
  email: 'test@example.com',
  password: 'testPasswor123!',
};
