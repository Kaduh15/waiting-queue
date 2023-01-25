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
    return `This action returns all waitingLine`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} waitingLine`;
  }

  async update(id: number, updateWaitingLineDto: UpdateWaitingLineDto) {
    return `This action updates a #${id} waitingLine`;
  }

  async remove(id: number) {
    return `This action removes a #${id} waitingLine`;
  }
}
