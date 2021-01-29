import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), JwtAuthGuard, UserModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
