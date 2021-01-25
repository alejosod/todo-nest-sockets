import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

const dataBaseModule = TypeOrmModule.forRoot({
  autoLoadEntities: true,
  database: 'test',
  entities: [],
  host: 'localhost',
  password: 'root',
  port: 3306,
  synchronize: true,
  type: 'mysql',
  username: 'root',
});

@Module({
  imports: [dataBaseModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
