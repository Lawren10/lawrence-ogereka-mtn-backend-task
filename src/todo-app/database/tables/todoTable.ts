import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ unique: true, nullable: false, name: 'userId' })
  userId: string;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => TodoTasks, (task) => task.todo, { eager: true })
  tasks: TodoTasks[];
}
