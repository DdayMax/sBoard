import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PollOption } from './poll-option.entity';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  question: string;

  // Связь "один ко многим" с PollOption
  @OneToMany(() => PollOption, (option) => option.poll, { cascade: true })
  options: PollOption[];
}
