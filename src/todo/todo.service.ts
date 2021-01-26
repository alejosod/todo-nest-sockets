import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './CreateTodoDto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(todoInformation: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.save(todoInformation);
  }

  async delete(todoId: number): Promise<any> {
    const todo = await this.todoRepository.find({ id: todoId });

    await this.todoRepository.delete(todoId);

    return todo;
  }

  getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getOne(todoId: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ id: todoId });

    if (todo) {
      return todo;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
