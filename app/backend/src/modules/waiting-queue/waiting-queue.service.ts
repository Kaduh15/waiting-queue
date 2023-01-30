import { PrismaService } from '../../prisma/Prisma.service';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateWaitingQueueDto } from './dto/create-waiting-queue.dto';
import { UpdateWaitingQueueDto } from './dto/update-waiting-queue.dto';

@Injectable()
export class WaitingQueueService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWaitingQueueDto: CreateWaitingQueueDto) {
    return this.prisma.waitingQueue.create({
      data: createWaitingQueueDto
    });
  }

  async findAll() {
    return this.prisma.waitingQueue.findMany();
  }

  async findOne(id: string) {
    return this.prisma.waitingQueue.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateWaitingQueueDto: UpdateWaitingQueueDto) {
    return this.prisma.waitingQueue.update({
      where: { id },
      data: updateWaitingQueueDto
    });
  }

  async remove(id: string) {
    await this.prisma.waitingQueue.delete({
      where: { id }
    });

    return { message: 'Client removed' };
  }

  async startService(id: string) {
    const client = await this.findOne(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (client.status !== 'WAITING') {
      throw new NotAcceptableException('Client is not waiting');
    }

    const clientUpdated = await this.prisma.waitingQueue.update({
      where: { id },
      data: {
        status: 'IN_PROGRESS',
        initialServiceTime: new Date(),
      },
    });

    return clientUpdated;
  }

  async finishService(id: string) {
    const client = await this.findOne(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (client.status !== 'IN_PROGRESS') {
      throw new NotAcceptableException('Client is not in service');
    }

    const clientUpdated = await this.prisma.waitingQueue.update({
      where: { id },
      data: {
        status: 'FINISHED',
        finishedServiceTime: new Date(),
      },
    });

    return clientUpdated;
  }

  async getClientsToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return this.prisma.waitingQueue.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
  }
}
