import { Test, TestingModule } from '@nestjs/testing';
import { WaitingLineController } from './waiting-line.controller';
import { WaitingLineService } from './waiting-line.service';

describe('WaitingLineController', () => {
  let controller: WaitingLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaitingLineController],
      providers: [WaitingLineService],
    }).compile();

    controller = module.get<WaitingLineController>(WaitingLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
