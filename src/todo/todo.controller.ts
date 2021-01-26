import { Body, Controller, Post } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './CreateTodoDto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  create(@Body() todoInformation: CreateTodoDto): Todo {
    return this.todoService.create(todoInformation);
  }
}
