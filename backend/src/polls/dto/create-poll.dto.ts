import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class CreatePollDto {
  @ApiProperty({
    description: 'The question of the poll',
    example: 'Приглашаем его на собсеседование?',
  })
  @IsString({ message: 'Question must be a string' })
  @IsNotEmpty({ message: 'Question cannot be empty' })
  readonly question: string;

  @ApiProperty({
    description: 'The options for the poll',
    example: ['Да', 'Нет'],
  })
  @IsArray()
  @ArrayMinSize(2, { message: 'At least two options are required' })
  @IsString({ each: true, message: 'Each option must be a string' })
  readonly options: string[];
}
