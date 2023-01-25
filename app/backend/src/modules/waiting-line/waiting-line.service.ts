import { PrismaService } from './../../prisma/Prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateWaitingLineDto } from './dto/create-waiting-line.dto';
import { UpdateWaitingLineDto } from './dto/update-waiting-line.dto';

@Injectable()
export class WaitingLineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWaitingLineDto: CreateWaitingLineDto) {
    return this.prisma.waitingLine.create({
      data: createWaitingLineDto
    });
  }

  async findAll() {
    return this.prisma.waitingLine.findMany();
  }

  async findOne(id: string) {
    return this.prisma.waitingLine.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateWaitingLineDto: UpdateWaitingLineDto) {
    return `This action updates a #${id} waitingLine`;
  }

  async remove(id: string) {
    return `This action removes a #${id} waitingLine`;
  }
}
