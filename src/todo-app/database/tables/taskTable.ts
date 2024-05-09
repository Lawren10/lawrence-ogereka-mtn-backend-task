import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from './todoTable';

@Entity({ name: 'todoTasks' })
export class TodoTasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: false })
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Todo, (todo) => todo.tasks)
  todo: Todo;
}
