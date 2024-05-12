/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../service/users/users.service'; //../../service/users/users.service
import { AuthenticateGuard } from '../../auth/guards/auth.guard'; //../../auth/guards/auth.guard
import { JwtGuard } from '../../auth/guards/jwtRoute.guard'; //../../auth/guards/jwtRoute.guard
import {
  mockAuthenticateGuard,
  mockJwtGuard,
} from '../../utils/types/mocks/guards/auth.guard.mock';
import {
  mockExecutionContext,
  mockUsersService,
  resJsonMock,
} from '../../utils/types/mocks/others/tests.services.mock';
import {
  mockRegisterUserDetails,
  mockLoginUserDetails,
} from '../../utils/types/mocks/others/tests.dtos.mocks';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

const res = {
  status: jest.fn(() => resJsonMock),
} as unknown as Response;

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let authenticateGuard: AuthenticateGuard;
  let jwtGuard: JwtGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthenticateGuard, useValue: mockAuthenticateGuard },
        { provide: JwtGuard, useValue: mockJwtGuard },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    authenticateGuard = module.get<AuthenticateGuard>(AuthenticateGuard);
    jwtGuard = module.get<JwtGuard>(JwtGuard);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mock service and guard behavior
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a new user and assert if successfull or not', async () => {
      const expectedResponse = {
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

      const expectedErrorResponse = {
        inserted: false,
        message: 'error.message',
      };
      await controller.registerUser(mockRegisterUserDetails, res);

      const result = await usersService.registerUser(mockRegisterUserDetails);

      expect(usersService.registerUser).toHaveBeenCalledWith(
        mockRegisterUserDetails,
      );

      if (result.inserted) {
        expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
        expect(resJsonMock.json).toHaveBeenCalledWith(expectedResponse);
      } else {
        expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(resJsonMock.json).toHaveBeenCalledWith(expectedErrorResponse);
      }
    });
  });

  describe('loginUser', () => {
    it('should login a new user and assert if token was generated successfull or not', async () => {
      const access =
        await mockAuthenticateGuard.canActivate(mockExecutionContext);

      await controller.loginUser(mockLoginUserDetails, res);

      usersService.grantUserAccess(mockLoginUserDetails);

      expect(mockAuthenticateGuard.canActivate).toHaveBeenCalled();
      expect(access).toBe(true);
      expect(usersService.grantUserAccess).toHaveBeenCalledWith(
        mockLoginUserDetails,
      );

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    });
  });

  describe('getAllUserTodos', () => {
    it('get all todos created by a user', async () => {
      const expectedSuccessRes = {
        success: true,
        todos: [
          {
            id: '1',
            name: 'testTodoName',
          },
        ],
      };

      const expectedFailureRes = {
        success: false,
        message: 'No todos found for this user ',
      };
      const mockUserId = 'testUserId';
      const req = {
        user: { userId: mockUserId },
      } as any;
      const access = await mockJwtGuard.canActivate(mockExecutionContext);

      await controller.getAllTodos(req, res);
      const todos = await mockUsersService.retrieveAllUserTodos(mockUserId);

      expect(mockJwtGuard.canActivate).toHaveBeenCalled();
      expect(access).toBe(true);
      expect(mockUsersService.retrieveAllUserTodos).toHaveBeenCalledWith(
        mockUserId,
      );
      if (todos) {
        expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
        expect(resJsonMock.json).toHaveBeenCalledWith(expectedSuccessRes);
      } else {
        expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(resJsonMock.json).toHaveBeenCalledWith(expectedFailureRes);
      }
    });
  });
});
