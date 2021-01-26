import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './CreateTodoDto';
import { SerializeFilter, SerializeSorting } from '../common/pipes';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/all')
  getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Get()
  @UsePipes(new SerializeFilter())
  @UsePipes(new SerializeSorting())
  getMany(
    @Query('filter') filter: string,
    @Query('ids') ids: string,
    @Query('sort') sort: string,
  ): void {
    console.log({ filter, ids, sort });
    this.todoService.getMany();
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
