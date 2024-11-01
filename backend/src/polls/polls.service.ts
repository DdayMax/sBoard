import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Poll } from './entities/poll.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollOption } from './entities/poll-option.entity';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll) private pollsRepository: Repository<Poll>,
    @InjectRepository(PollOption)
    private optionsRepository: Repository<PollOption>,
  ) {}

  async create(createPollDto: CreatePollDto): Promise<Poll> {
    const poll = new Poll();
    poll.question = createPollDto.question;

    poll.options = createPollDto.options.map((optionText) => {
      const option = new PollOption();
      option.optionText = optionText;
      return option;
    });
    return this.pollsRepository.save(poll);
  }
  async findAll(): Promise<Poll[]> {
    return this.pollsRepository.find({
      relations: ['options'],
      order: { options: { id: 'ASC' } },
    });
  }

  async findOne(id: number): Promise<Poll> {
    const poll = await this.pollsRepository.findOne({
      where: { id },
    });

    if (!poll) {
      throw new NotFoundException(`Poll with ID ${id} not found`);
    }
    return poll;
  }

  async vote(pollId: number, optionId: number): Promise<void> {
    const poll = await this.pollsRepository.findOne({
      where: { id: pollId },
      relations: ['options'],
    });

    if (!poll) {
      throw new NotFoundException(`Poll with ID ${pollId} not found`);
    }

    const option = await this.optionsRepository.findOne({
      where: { id: optionId, poll: { id: pollId } },
    });

    if (!option) {
      throw new NotFoundException(`Option with ID ${optionId} not found`);
    }

    option.votes += 1;

    await this.optionsRepository.save(option);
  }

  async delete(id: number): Promise<void> {
    const result: DeleteResult = await this.pollsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Poll with ID ${id} not found`);
    }
  }
}
