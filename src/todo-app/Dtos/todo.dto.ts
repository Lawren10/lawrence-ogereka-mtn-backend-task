import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodoDetails {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'todo name must be at least 5 characters long or above',
  })
  name: string;
}
