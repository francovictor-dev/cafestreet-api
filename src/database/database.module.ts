import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'mydatabase',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
