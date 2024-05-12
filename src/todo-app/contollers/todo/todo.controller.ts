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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateTodoDetails } from 'src/todo-app/Dtos/todo.dto';
import { JwtGuard } from 'src/todo-app/auth/guards/jwtRoute.guard';
import { TodoService } from 'src/todo-app/service/todo/todo.service';

@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async createTodo(
    @Req() req: Request,
    @Body() todoDetails: CreateTodoDetails,
    @Res() res: Response,
  ) {
    const id = req.user['id'];
    const { name } = todoDetails;
    const todo = await this.todoService.addTodo(name, id);
    return res.status(HttpStatus.CREATED).json(todo);
  }
  @ApiProperty()
  @Get(':id')
  @UseGuards(JwtGuard)
  async getTodoById(@Res() res: Response, @Param('id') id: string) {
    const singleTodo = await this.todoService.getSingleTodo(id);
    if (singleTodo) {
      return res.status(HttpStatus.OK).json({
        success: true,
        todo: singleTodo,
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Todo not found',
      });
    }
  }

  @ApiProperty()
  @Get('alltask/:id')
  @UseGuards(JwtGuard)
  async getAllTask(@Res() res: Response, @Param('id') id: string) {
    const tasks = await this.todoService.retriveAllTaks(id);
    if (tasks) {
      return res.status(HttpStatus.OK).json({
        success: true,
        tasks,
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'todo not found',
      });
    }
  }

  @ApiProperty()
  @Put('update/:id')
  @UseGuards(JwtGuard)
  async updateTodoById(
    @Body() updateDetail: CreateTodoDetails,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const { name } = updateDetail;

    const updatedTodo = await this.todoService.updateTodo(id, name);
    if (updatedTodo) {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Todo updated successfully',
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Todo update failed',
      });
    }
  }

  @ApiProperty()
  @Delete('delete/:id')
  @UseGuards(JwtGuard)
  async deleteTodoById(@Res() res: Response, @Param('id') id: string) {
    const deleted = await this.todoService.deleteTodo(id);
    if (deleted) {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Todo deleted successfully',
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Todo not found',
      });
    }
  }
}
