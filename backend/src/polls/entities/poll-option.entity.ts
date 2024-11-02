import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Poll } from './poll.entity';

@Entity()
export class PollOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  optionText: string;

  @Column({ default: 0 }) // Количество голосов за вариант ответа
  votes: number;

  // Связь "многие к одному" с Poll
  @ManyToOne(() => Poll, (poll) => poll.options, { onDelete: 'CASCADE' })
  poll: Poll;
}
