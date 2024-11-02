import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { VoteDto } from './dto/vote.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createPollDto: CreatePollDto) {
    return this.pollsService.create(createPollDto);
  }

  @Post(':id/vote')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async vote(@Param('id') id: number, @Body() voteDto: VoteDto) {
    return this.pollsService.vote(id, voteDto.optionId);
  }

  @Get()
  async findAll() {
    return this.pollsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.pollsService.delete(id);
  }
}
