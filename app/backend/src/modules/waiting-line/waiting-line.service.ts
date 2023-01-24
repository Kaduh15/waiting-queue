import { Injectable } from '@nestjs/common';
import { CreateWaitingLineDto } from './dto/create-waiting-line.dto';
import { UpdateWaitingLineDto } from './dto/update-waiting-line.dto';

@Injectable()
export class WaitingLineService {
  async create(createWaitingLineDto: CreateWaitingLineDto) {
    return 'This action adds a new waitingLine';
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
