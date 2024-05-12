import { ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/todo-app/service/users/users.service';

export const mockExecutionContext: ExecutionContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  getHandler: jest.fn(),
  getClass: jest.fn(),
  getArgs: jest.fn().mockReturnValue([]),
  getArgByIndex: jest.fn(),
  switchToRpc: jest.fn().mockReturnThis(),
  switchToWs: jest.fn().mockReturnThis(),
  getType: jest.fn().mockReturnValue('http'),
};

export const resJsonMock = {
  json: jest.fn((y) => y),
};
export const registerResolvedValue = {
  inserted: true,
  message: 'User registered successfully',
  user: {
    id: '1',
    username: 'testUser',
    email: 'test@example.com',
    password: 'testPasswor123!',
    createdAt: '2023-04-20T12:00:00.000Z',
    todos: [],
  },
};

const registerUserErrorResponse = {
  inserted: false,
  message: 'error.message',
};

const resolveRegisterUserCall = (check: boolean) => {
  if (check) {
    return registerResolvedValue;
  } else {
    return registerUserErrorResponse;
  }
};

export const successRes = [
  {
    id: '1',
    name: 'testTodoName',
  },
];

const resolveretriveAllUsersTodo = (valid: boolean) => {
  if (valid) {
    return successRes;
  } else {
    return null;
  }
};

export const mockUsersService: Partial<UsersService> = {
  registerUser: jest.fn().mockResolvedValue(resolveRegisterUserCall(true)),
  validateUser: jest.fn(),
  grantUserAccess: jest.fn(),
  retrieveAllUserTodos: jest
    .fn()
    .mockResolvedValue(resolveretriveAllUsersTodo(false)),
};
