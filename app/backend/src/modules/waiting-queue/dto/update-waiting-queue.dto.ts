import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString, IS_ALPHA } from 'class-validator';
import { Status } from '../entities/waiting-queue.entity';
import { CreateWaitingQueueDto } from './create-waiting-queue.dto';

export class UpdateWaitingQueueDto extends PartialType(CreateWaitingQueueDto) {
  /*
   * Nome do Cliente
   * @example Pedro da Silva
   */
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Status do atendimento',
    example: 'FINISHED',
    enum: ['WAITING', 'IN_PROGRESS', 'FINISHED', 'ABSENT'],
    type: 'string',
  })
  @IsString()
  status: Status;

  /*
   * Data de inicio do atendimento
   * @example '2021-01-01T00:00:00.000Z'
   */
  @IsDate()
  initialServiceTime?: Date;

  /*
   * Data de fim do atendimento
   * @example 2021-01-01T00:00:00.000Z
   */
  @IsDate()
  finishedServiceTime?: Date;
}
