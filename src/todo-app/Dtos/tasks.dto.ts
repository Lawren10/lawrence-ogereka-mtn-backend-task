import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDetails {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({
    name: 'status',
    description:
      'Status of the task and should be either pending or completed ',
  })
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  todoId: string;
}
