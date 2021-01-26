import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Todo } from './todo/todo.entity';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const dataBaseModule = TypeOrmModule.forRoot({
  autoLoadEntities: true,
  database: process.env.DB_NAME,
  entities: [Todo],
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 3306,
  type: 'mysql',
  username: process.env.DB_USERNAME,
});

@Module({
  imports: [ConfigModule.forRoot(), dataBaseModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
