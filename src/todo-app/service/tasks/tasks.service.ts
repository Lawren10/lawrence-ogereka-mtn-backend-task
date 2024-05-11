import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoTasks } from 'src/todo-app/database/tables/taskTable';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TodoTasks) private tasksTable: Repository<TodoTasks>,
  ) {}
  async addTask(taskDetails: any) {
    try {
      const task = await this.tasksTable.save(taskDetails);
      return task;
    } catch (error) {
      return error.message;
    }
  }
}
