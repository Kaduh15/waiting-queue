import { Module } from '@nestjs/common';
import { WaitingLineService } from './waiting-line.service';
import { WaitingLineController } from './waiting-line.controller';

@Module({
  controllers: [WaitingLineController],
  providers: [WaitingLineService]
})
export class WaitingLineModule {}
