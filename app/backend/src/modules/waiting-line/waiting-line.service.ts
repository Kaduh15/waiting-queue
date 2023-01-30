import { PrismaService } from './../../prisma/Prisma.service';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWaitingLineDto } from './dto/create-waiting-line.dto';
import { UpdateWaitingLineDto } from './dto/update-waiting-line.dto';

@Injectable()
export class WaitingLineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWaitingLineDto: CreateWaitingLineDto) {
    return this.prisma.waitingLine.create({
      data: createWaitingLineDto,
    });
  }

  async findAll() {
    return this.prisma.waitingLine.findMany();
  }

  async findOne(id: string) {
    return this.prisma.waitingLine.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateWaitingLineDto: UpdateWaitingLineDto) {
    return this.prisma.waitingLine.update({
      where: { id },
      data: updateWaitingLineDto,
    });
  }

  async remove(id: string) {
    await this.prisma.waitingLine.delete({
      where: { id },
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

    const clientUpdated = await this.prisma.waitingLine.update({
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

    const clientUpdated = await this.prisma.waitingLine.update({
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

    return this.prisma.waitingLine.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
  }
}
