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

  async getSingleTask(id: string) {
    const task = await this.tasksTable.findOne({ where: { id } });
    const { dueDate } = task;
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);

    let taskValidTime: number = taskDueDate.getTime() - currentDate.getTime();
    taskValidTime = taskValidTime / (1000 * 60 * 60);
    if (taskValidTime <= 3) {
      return { ...task, status: { status: task.status, color: 'red' } };
    } else if (taskValidTime <= 24) {
      return { ...task, status: { status: task.status, color: 'amber' } };
    } else {
      return { ...task, status: { status: task.status, color: 'green' } };
    }
  }

  async updateTask(
    updateDetails: {
      name: string;
      description: string;
      dueDate: Date;
      status: string;
    },
    id: string,
  ) {
    const { name, description, dueDate, status } = updateDetails;
    try {
      await this.tasksTable
        .createQueryBuilder()
        .update(TodoTasks)
        .set({ name, description, dueDate, status })
        .where('id = :id', { id })
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteTask(id: string) {
    const deleted = await this.tasksTable
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .execute();
    if (deleted.affected >= 1) {
      return true;
    } else {
      return false;
    }
  }
}
