import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './usersTable';
import { TodoTasks } from './taskTable';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @OneToMany(() => TodoTasks, (task) => task.todo)
  tasks: TodoTasks[];
}
