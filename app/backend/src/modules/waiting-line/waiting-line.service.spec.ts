import { CreateWaitingLineDto } from './dto/create-waiting-line.dto';
import { PrismaService } from './../../prisma/Prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { WaitingLineService } from './waiting-line.service';
import { WaitingLine } from './entities/waiting-line.entity';

describe('WaitingLineService', () => {
  let service: WaitingLineService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService,WaitingLineService],
    }).compile();

    service = module.get<WaitingLineService>(WaitingLineService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a waiting line', async () => {
      const name = 'Test'

      const clientInput: CreateWaitingLineDto = {
        name
      };

      const clientOutput: WaitingLine = {
        id: 'uuid',
        name,
        createdAt: new Date(),
        status: 'WAITING',
        initialServiceTime: null,
        finishedServiceTime: null
      }

      jest.spyOn(prisma.waitingLine, 'create').mockImplementation(() => clientOutput as any)

      const waitingLine = await service.create(clientInput);

      expect(waitingLine).toEqual(clientOutput);
    });
  })

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const result = ['test'];

      jest.spyOn(prisma.waitingLine, 'findMany').mockImplementation(() => result as any);

      expect(await service.findAll()).toBe(result);
    });
  })

  describe('findOne', () => {
    it('should return a client', async () => {
      const idValid = 'uuid'

      const clientOutput: WaitingLine = {
        id: idValid,
        name: 'João',
        createdAt: new Date(),
        status: 'WAITING',
        initialServiceTime: null,
        finishedServiceTime: null
      };

      jest.spyOn(prisma.waitingLine, 'findUnique').mockImplementation(() => clientOutput as any);

      expect(await service.findOne('1')).toBe(clientOutput);
    });
  })

  describe('update', () => {
    it('should update a client', async () => {
      const idValid = 'uuid'

      const clientOutput: WaitingLine = {
        id: idValid,
        name: 'João',
        createdAt: new Date(),
        status: 'IN_PROGRESS',
        initialServiceTime: new Date(),
        finishedServiceTime: null
      };

      jest.spyOn(prisma.waitingLine, 'update').mockImplementation(() => clientOutput as any);

      expect(await service.update(idValid, clientOutput)).toBe(clientOutput);
    });
  })

  describe('remove', () => {
    it('should remove a client', async () => {
      const idValid = 'uuid'

      jest.spyOn(prisma.waitingLine, 'delete').mockImplementation(null);

      expect(await service.remove(idValid)).toEqual({ message: 'Client removed' });
    })
  })

  describe('startService', () => {
    it('should start a service', async () => {
      const idValid = 'uuid'

      const clientOutput: WaitingLine = {
        id: idValid,
        name: 'João',
        createdAt: new Date(),
        status: 'IN_PROGRESS',
        initialServiceTime: new Date(),
        finishedServiceTime: null
      };

      jest.spyOn(service, 'findOne').mockImplementation(() => ({status: 'WAITING'}) as any);
      jest.spyOn(prisma.waitingLine, 'update').mockImplementation(() => clientOutput as any);

      const result = await service.startService(idValid);

      expect(result.status).toBe('IN_PROGRESS');
      expect(result.initialServiceTime).not.toBe(null);
    })
  })

  describe('finishService', () => {
    it('should finish a service', async () => {
      const idValid = 'uuid'

      const clientOutput: WaitingLine = {
        id: idValid,
        name: 'João',
        createdAt: new Date(),
        status: 'FINISHED',
        initialServiceTime: new Date(),
        finishedServiceTime: new Date()
      };

      jest.spyOn(service, 'findOne').mockImplementation(() => ({status: 'IN_PROGRESS'}) as any);
      jest.spyOn(prisma.waitingLine, 'update').mockImplementation(() => clientOutput as any);

      const result = await service.finishService(idValid);

      expect(result.status).toBe('FINISHED');
      expect(result.finishedServiceTime).not.toBe(null);
    })
  })
});
