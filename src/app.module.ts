import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';

const dataBaseModule = TypeOrmModule.forRoot({
  autoLoadEntities: true,
  database: 'test',
  entities: [Todo],
  host: 'localhost',
  password: 'Ichthysabba2',
  port: 3306,
  type: 'mysql',
  username: 'root',
});

@Module({
  imports: [dataBaseModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
