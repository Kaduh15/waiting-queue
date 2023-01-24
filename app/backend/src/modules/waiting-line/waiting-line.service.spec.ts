import { Test, TestingModule } from '@nestjs/testing';
import { WaitingLineService } from './waiting-line.service';

describe('WaitingLineService', () => {
  let service: WaitingLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitingLineService],
    }).compile();

    service = module.get<WaitingLineService>(WaitingLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
