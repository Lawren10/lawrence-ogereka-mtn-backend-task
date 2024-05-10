import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  // constructor(private jwtService: JwtService) {}
  //the jwt service is used to hash the usermane and password to create the token for login users and send to the client to save for next authentication.

  getAllUsers() {
    // Implement logic to fetch all users
    return [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Bob Johnson' },
    ];
  }
}
