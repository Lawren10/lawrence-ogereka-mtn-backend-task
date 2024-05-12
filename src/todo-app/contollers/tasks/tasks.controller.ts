/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';
import {
  CreateTaskDetails,
  UpdateTaskDetails,
} from 'src/todo-app/Dtos/tasks.dto';
import { JwtGuard } from 'src/todo-app/auth/guards/jwtRoute.guard';
import { TasksService } from 'src/todo-app/service/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiProperty()
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

  @ApiProperty()
  @Get('/:id')
  @UseGuards(JwtGuard)
  async getTaskById(@Res() res: Response, @Param('id') id: string) {
    const task = await this.tasksService.getSingleTask(id);
    if (task) {
      return res.status(HttpStatus.OK).json({
        success: true,
        task,
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Task not found',
      });
    }
  }

  @ApiProperty()
  @Put('/update/:id')
  @UseGuards(JwtGuard)
  async updateTaskById(
    @Body() updateDetail: UpdateTaskDetails,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const updatedTask = await this.tasksService.updateTask(updateDetail, id);
    if (updatedTask) {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Task updated successfully',
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Task update failed',
      });
    }
  }

  @ApiProperty()
  @Delete('/delete/:id')
  @UseGuards(JwtGuard)
  async deleteTaskById(@Res() res: Response, @Param('id') id: string) {
    const deleted = await this.tasksService.deleteTask(id);
    console.log(deleted);
    if (deleted) {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Task not found',
      });
    }
  }
}
