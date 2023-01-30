import { PrismaService } from '../../prisma/Prisma.service';
import { Module } from '@nestjs/common';
import { WaitingQueueService } from './waiting-queue.service';
import { WaitingQueueController } from './waiting-queue.controller';

@Module({
  controllers: [WaitingQueueController],
  providers: [PrismaService, WaitingQueueService]
})
export class WaitingQueueModule {}
