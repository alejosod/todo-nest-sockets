import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Todo } from '../todo/todo.entity';
import { ROLES } from '../common/Dtos';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    default: ROLES.Employee,
  })
  role: string;

  @OneToMany(() => Todo, (todo) => todo.creator)
  todos: Todo[];

  @OneToMany(() => Todo, (todo) => todo.assignee)
  tasks: Todo[];
}
