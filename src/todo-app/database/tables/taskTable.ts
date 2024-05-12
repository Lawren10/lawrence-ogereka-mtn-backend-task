import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: false, name: 'todoId' })
  todoId: string;

  @Column({ nullable: false })
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Todo, (todo) => todo.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId' })
  todo: Todo;
}
