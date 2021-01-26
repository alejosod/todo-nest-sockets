import { CreateTodoDto } from './CreateTodoDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(todoInformation: CreateTodoDto): Todo {
    return this.todoRepository.create(todoInformation);
  }

  delete(todoId: number): Promise<any> {
    return this.todoRepository.delete({ id: todoId });
  }

  getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
}
