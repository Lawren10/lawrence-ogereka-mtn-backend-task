import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDetails } from 'src/todo-app/Dtos/tasks.dto';
import { TasksService } from 'src/todo-app/service/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('create')
  createTask(@Body() taskDetails: CreateTaskDetails) {
    console.log(taskDetails);
  }
}
