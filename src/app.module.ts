import { Module } from '@nestjs/common';
import { TodoAppModule } from './todo-app/todo-app.module';

@Module({
  imports: [TodoAppModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
