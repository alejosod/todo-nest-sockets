import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './Dtos/CreateTodoDto';
import { Todo } from './todo.entity';
import { TodoIncludeEnum } from './Dtos/getTodoIncludeDto';

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

  async deleteMany(ids: string[]): Promise<number> {
    const result = await this.todoRepository.delete([...ids]);

    const { affected } = result;

    return affected;
  }

  getAll(order, include): Promise<Todo[]> {
    const options: any = {};

    if (order) {
      options.order = order;
    }

    if (include) {
      options.relations = include;
    }

    return this.todoRepository.find(options);
  }

  getMany(ids: string, filter: any, order: any): Promise<Todo[]> {
    if (ids) {
      const where = ids.split(',').map((id) => ({ id }));

      return this.todoRepository.find({ where });
    } else {
      const options: any = {};

      if (order) {
        options.order = order;
      }

      if (filter) {
        options.where = filter;
      }

      return this.todoRepository.find(options);
    }
  }

  async getOne(todoId: number, include: Array<TodoIncludeEnum>): Promise<Todo> {
    const options: any = {};
    options.relations = include;

    const todo = await this.todoRepository.findOne({ id: todoId }, options);

    if (todo) {
      return todo;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
