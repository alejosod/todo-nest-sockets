import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './CreateTodoDto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Get('/:id')
  GetOne(@Param('id') id: number): Promise<Todo> {
    return this.todoService.getOne(id);
  }

  @Post()
  create(@Body() todoInformation: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(todoInformation);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<Todo> {
    return this.todoService.delete(id);
  }

  @Delete()
  deleteMany(@Query('ids') ids: string): Promise<number> {
    const idsMap: Array<string> = ids.split(',');

    return this.todoService.deleteMany(idsMap);
  }
}
