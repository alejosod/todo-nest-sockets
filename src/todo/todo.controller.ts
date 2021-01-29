import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './Dtos/CreateTodoDto';
import { SerializeFilter, SerializeSorting } from '../common/pipes';
import { GetManyFilterDto } from './Dtos/getManyFilterDto';
import { GetManySortDto } from './Dtos/getManySortDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AttachAssignee } from './pipes/attachAssignee';
import { SetRelations } from './pipes/setRelations';
import { TodoIncludeEnum } from './Dtos/getTodoIncludeDto';

@Controller('todo')
export class TodoController {
  @Get('/all')
  getAll(
    @Query(
      'sort',
      new SerializeSorting(),
      new ValidationPipe({ whitelist: true }),
    )
    sort: GetManySortDto | undefined,
    @Query(
      'include',
      new SetRelations(),
      new ValidationPipe({ whitelist: true }),
    )
    include: Array<TodoIncludeEnum>,
  ): Promise<Todo[]> {
    return this.todoService.getAll(sort, include);
  }

  constructor(private todoService: TodoService) {}

  @Get()
  getMany(
    @Query(
      'filter',
      new SerializeFilter(),
      new ValidationPipe({ whitelist: true }),
    )
    filter: GetManyFilterDto | undefined,
    @Query('ids') ids: string | undefined,
    @Query(
      'sort',
      new SerializeSorting(),
      new ValidationPipe({ whitelist: true }),
    )
    sort: GetManySortDto | undefined,
    @Query(
      'include',
      new SetRelations(),
      new ValidationPipe({ whitelist: true }),
    )
    include: Array<TodoIncludeEnum>,
  ): Promise<Todo[]> {
    return this.todoService.getMany(ids, filter, sort);
  }

  @Get('/:id')
  GetOne(
    @Param('id') id: number,
    @Query(
      'include',
      new SetRelations(),
      new ValidationPipe({ whitelist: true }),
    )
    include: Array<TodoIncludeEnum>,
  ): Promise<Todo> {
    return this.todoService.getOne(id, include);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(AttachAssignee) todo: CreateTodoDto,
    @Request() req,
  ): Promise<Todo> {
    return this.todoService.create({
      ...todo,
      creator: req.user,
    });
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
