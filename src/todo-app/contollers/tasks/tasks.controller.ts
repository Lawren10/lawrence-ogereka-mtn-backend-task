import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateTaskDetails } from 'src/todo-app/Dtos/tasks.dto';
import { JwtGuard } from 'src/todo-app/auth/guards/jwtRoute.guard';
import { TasksService } from 'src/todo-app/service/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async createTask(
    @Body() taskDetails: CreateTaskDetails,
    @Res() res: Response,
  ) {
    const task = await this.tasksService.addTask(taskDetails);
    return res.status(HttpStatus.CREATED).json({
      success: true,
      task,
    });
  }
}
