import { PrismaService } from '../../prisma/Prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { WaitingQueueController } from './waiting-queue.controller';
import { WaitingQueueService } from './waiting-queue.service';

describe('WaitingQueueController', () => {
  let controller: WaitingQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaitingQueueController],
      providers: [PrismaService, WaitingQueueService],
    }).compile();

    controller = module.get<WaitingQueueController>(WaitingQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
