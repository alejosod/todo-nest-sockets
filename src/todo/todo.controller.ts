import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './Dtos/CreateTodoDto';
import {
  SerializeFilter,
  SerializeSorting,
  ValidateFilter,
} from '../common/pipes';
import { GetManyFilterDto } from './Dtos/getManyFilterDto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/all')
  getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Get()
  getMany(
    @Query(
      'filter',
      new SerializeFilter(),
      new ValidationPipe({ whitelist: true }),
    )
    filter: GetManyFilterDto | undefined,
    @Query('ids') ids: string | undefined,
    @Query('sort', new SerializeSorting()) sort: any,
  ): Promise<Todo[]> {
    return this.todoService.getMany(ids, filter, sort);
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
