import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAllUsers() {
    // Implement logic to fetch all users
    return [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Bob Johnson' },
    ];
  }
}
