import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo-app/database/tables/todoTable';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoTable: Repository<Todo>) {}

  async addTodo(name: string, userId: string) {
    try {
      const todo = await this.todoTable.save({ name, userId });
      console.log(todo);

      return todo;
    } catch (error) {
      console.log(error);

      return error.message;
    }
  }

  async getSingleTodo(id: string) {
    const todo = await this.todoTable.findOne({ where: { id } });
    return todo;
  }

  async updateTodo(id: string, name: string) {
    try {
      await this.todoTable
        .createQueryBuilder()
        .update(Todo)
        .set({ name })
        .where('id = :id', { id })
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteTodo(id: string) {
    const d = await this.todoTable.delete(id);
    if (d.affected >= 1) {
      return true;
    } else {
      return false;
    }
  }
}
