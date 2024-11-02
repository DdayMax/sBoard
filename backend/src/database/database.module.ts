import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const isProd = process.env.production;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: isProd ? 'db' : 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'polls',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
