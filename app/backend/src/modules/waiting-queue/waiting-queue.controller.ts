import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, Headers } from '@nestjs/common';
import { WaitingQueueService } from './waiting-queue.service';
import { CreateWaitingQueueDto } from './dto/create-waiting-queue.dto';
import { UpdateWaitingQueueDto } from './dto/update-waiting-queue.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { WaitingQueue } from './entities/waiting-queue.entity';

@ApiTags('Waiting Queue')
@Controller('waiting-queue')
export class WaitingQueueController {
  constructor(private readonly WaitingQueueService: WaitingQueueService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async create(@Body() createWaitingQueueDto: CreateWaitingQueueDto, @Headers() headers: Headers) {
    return this.WaitingQueueService.create(createWaitingQueueDto);
  }

  @Get()
  async findAll() {
    return this.WaitingQueueService.findAll();
  }

  @Get('today')
  async getClientsToday() {
    return this.WaitingQueueService.getClientsToday();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.WaitingQueueService.findOne(id);
  }

  @Patch(':id/start')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Client started service' , type: WaitingQueue })
  async startService(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.WaitingQueueService.startService(id);
  }

  @Patch(':id/finish')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async finishService(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.WaitingQueueService.finishService(id);
  }

  @Patch(':id')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateWaitingQueueDto: UpdateWaitingQueueDto) {
    return this.WaitingQueueService.update(id, updateWaitingQueueDto);
  }

  @Delete(':id')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.WaitingQueueService.remove(id);
  }
}
