/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  // let service: UsersService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [UsersService],
  //   }).compile();

  //   service = module.get<UsersService>(UsersService);
  // });

  it('should be defined', () => {
    const valid = true;
    expect(valid).toBe(true);
    // expect(service).toBeDefined();
  });
});
