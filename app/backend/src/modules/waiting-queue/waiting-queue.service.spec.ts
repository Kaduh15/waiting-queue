import { CreateWaitingQueueDto } from './dto/create-waiting-queue.dto';
import { PrismaService } from '../../prisma/Prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { WaitingQueueService } from './waiting-queue.service';
import { Status, WaitingQueue } from './entities/waiting-queue.entity';

describe('WaitingQueueService', () => {
  let service: WaitingQueueService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.service.spec.ts
      providers: [PrismaService, WaitingLineService],
=======
      providers: [PrismaService,WaitingQueueService],
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.service.spec.ts
    }).compile();

    service = module.get<WaitingQueueService>(WaitingQueueService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.service.spec.ts
    it('should create a waiting line', async () => {
      const name = 'Test';

      const clientInput: CreateWaitingLineDto = {
        name,
=======
    it('should create a Waiting Queue', async () => {
      const name = 'Test'

      const clientInput: CreateWaitingQueueDto = {
        name
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.service.spec.ts
      };

      const clientOutput: WaitingQueue = {
        id: 'uuid',
        name,
        createdAt: new Date(),
        status: Status.Waiting,
        initialServiceTime: null,
        finishedServiceTime: null,
      };

      jest.spyOn(prisma.waitingQueue, 'create').mockImplementation(() => clientOutput as any)

      const WaitingQueue = await service.create(clientInput);

      expect(WaitingQueue).toEqual(clientOutput);
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const result = ['test'];

<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.service.spec.ts
      jest
        .spyOn(prisma.waitingLine, 'findMany')
        .mockImplementation(() => result as any);
=======
      jest.spyOn(prisma.waitingQueue, 'findMany').mockImplementation(() => result as any);
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.service.spec.ts

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a client', async () => {
      const idValid = 'uuid';

      const clientOutput: WaitingQueue = {
        id: idValid,
        name: 'João',
        createdAt: new Date(),
        status: Status.Waiting,
        initialServiceTime: null,
        finishedServiceTime: null,
      };

<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.service.spec.ts
      jest
        .spyOn(prisma.waitingLine, 'findUnique')
        .mockImplementation(() => clientOutput as any);
=======
      jest.spyOn(prisma.waitingQueue, 'findUnique').mockImplementation(() => clientOutput as any);
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.service.spec.ts

      expect(await service.findOne('1')).toBe(clientOutput);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const idValid = 'uuid';

      const clientOutput: WaitingQueue = {
        id: idValid,
        name: 'João',
        createdAt: new Date(),
        status: Status.In_progress,
        initialServiceTime: new Date(),
        finishedServiceTime: null,
      };

<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.service.spec.ts
      jest
        .spyOn(prisma.waitingLine, 'update')
        .mockImplementation(() => clientOutput as any);
=======
      jest.spyOn(prisma.waitingQueue, 'update').mockImplementation(() => clientOutput as any);
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.service.spec.ts

      expect(await service.update(idValid, clientOutput)).toBe(clientOutput);
    });
  });

  describe('remove', () => {
    it('should remove a client', async () => {
      const idValid = 'uuid';

      jest.spyOn(prisma.waitingQueue, 'delete').mockImplementation(null);

      expect(await service.remove(idValid)).toEqual({
        message: 'Client removed',
      });
    });
  });

  describe('startService', () => {
    it('should start a service', async () => {
      const idValid = 'uuid';

      const clientOutput: WaitingQueue = {
        id: idValid,
        name: 'João',
        createdAt: new Date(),
        status: Status.In_progress,
        initialServiceTime: new Date(),
        finishedServiceTime: null,
      };

<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.service.spec.ts
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => ({ status: 'WAITING' } as any));
      jest
        .spyOn(prisma.waitingLine, 'update')
        .mockImplementation(() => clientOutput as any);
=======
      jest.spyOn(service, 'findOne').mockImplementation(() => ({status: 'WAITING'}) as any);
      jest.spyOn(prisma.waitingQueue, 'update').mockImplementation(() => clientOutput as any);
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.service.spec.ts

      const result = await service.startService(idValid);

      expect(result.status).toBe('IN_PROGRESS');
      expect(result.initialServiceTime).not.toBe(null);
    });
  });

  describe('finishService', () => {
    it('should finish a service', async () => {
      const idValid = 'uuid';

      const clientOutput: WaitingQueue = {
        id: idValid,
        name: 'João',
        createdAt: new Date(),
        status: Status.Finished,
        initialServiceTime: new Date(),
        finishedServiceTime: new Date(),
      };

<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.service.spec.ts
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => ({ status: 'IN_PROGRESS' } as any));
      jest
        .spyOn(prisma.waitingLine, 'update')
        .mockImplementation(() => clientOutput as any);
=======
      jest.spyOn(service, 'findOne').mockImplementation(() => ({status: 'IN_PROGRESS'}) as any);
      jest.spyOn(prisma.waitingQueue, 'update').mockImplementation(() => clientOutput as any);
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.service.spec.ts

      const result = await service.finishService(idValid);

      expect(result.status).toBe('FINISHED');
      expect(result.finishedServiceTime).not.toBe(null);
    });
  });

  describe('getClientsToday', () => {
    it('should return an array of customers registered on the day', async () => {
      const clientBase: WaitingQueue = {
        id: 'uuid',
        name: 'João',
        createdAt: new Date(),
        status: Status.Waiting,
        initialServiceTime: null,
        finishedServiceTime: null,
      };

      const result = [
        clientBase,
        {
          ...clientBase,
          name: 'pedro',
        },
        {
          ...clientBase,
          name: 'André',
        },
      ];

<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.service.spec.ts
      jest
        .spyOn(prisma.waitingLine, 'findMany')
        .mockImplementation(() => result as any);
=======
      jest.spyOn(prisma.waitingQueue, 'findMany').mockImplementation(() => result as any);
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.service.spec.ts

      expect(await service.getClientsToday()).toBe(result);
    });
  });
});
