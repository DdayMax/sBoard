import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class VoteDto {
  @ApiProperty({ description: 'Id of the selected option' })
  @IsInt({ message: 'Option id must be an integer' })
  @Min(1, { message: 'Option id must be a non-negative number' })
  readonly optionId: number;
}
