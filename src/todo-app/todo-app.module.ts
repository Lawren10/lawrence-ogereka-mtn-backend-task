import { Module } from '@nestjs/common';
import { UsersController } from './contollers/users/users.controller';
import { UsersService } from './service/users/users.service';
import { TodoController } from './contollers/todo/todo.controller';
import { TasksController } from './contollers/tasks/tasks.controller';
import { TodoService } from './service/todo/todo.service';
import { TasksService } from './service/tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/tables/usersTable';
import { Todo } from './database/tables/todoTable';
import { TodoTasks } from './database/tables/taskTable';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Todo, TodoTasks],
      synchronize: true,
    }),
  ],
  controllers: [UsersController, TodoController, TasksController],
  providers: [UsersService, TodoService, TasksService],
})
export class TodoAppModule {}
