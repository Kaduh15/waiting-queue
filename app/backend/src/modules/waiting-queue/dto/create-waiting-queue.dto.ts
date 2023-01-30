import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWaitingQueueDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Pedro da Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
