import { PrismaService } from './../../prisma/Prisma.service';
import { Module } from '@nestjs/common';
import { WaitingLineService } from './waiting-line.service';
import { WaitingLineController } from './waiting-line.controller';

@Module({
  controllers: [WaitingLineController],
  providers: [PrismaService, WaitingLineService]
})
export class WaitingLineModule {}
