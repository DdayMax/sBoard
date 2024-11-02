import { Module } from '@nestjs/common';
import { PollsModule } from './polls/polls.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, PollsModule],
})
export class AppModule {}
