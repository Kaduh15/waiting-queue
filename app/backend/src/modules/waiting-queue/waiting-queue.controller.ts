<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Headers,
} from '@nestjs/common';
import { WaitingLineService } from './waiting-line.service';
import { CreateWaitingLineDto } from './dto/create-waiting-line.dto';
import { UpdateWaitingLineDto } from './dto/update-waiting-line.dto';
=======
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, Headers } from '@nestjs/common';
import { WaitingQueueService } from './waiting-queue.service';
import { CreateWaitingQueueDto } from './dto/create-waiting-queue.dto';
import { UpdateWaitingQueueDto } from './dto/update-waiting-queue.dto';
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.controller.ts
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
<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.controller.ts
  async create(
    @Body() createWaitingLineDto: CreateWaitingLineDto,
    @Headers() headers: Headers,
  ) {
    return this.waitingLineService.create(createWaitingLineDto);
=======
  async create(@Body() createWaitingQueueDto: CreateWaitingQueueDto, @Headers() headers: Headers) {
    return this.WaitingQueueService.create(createWaitingQueueDto);
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.controller.ts
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
<<<<<<< HEAD:app/backend/src/modules/waiting-line/waiting-line.controller.ts
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateWaitingLineDto: UpdateWaitingLineDto,
  ) {
    return this.waitingLineService.update(id, updateWaitingLineDto);
=======
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateWaitingQueueDto: UpdateWaitingQueueDto) {
    return this.WaitingQueueService.update(id, updateWaitingQueueDto);
>>>>>>> main:app/backend/src/modules/waiting-queue/waiting-queue.controller.ts
  }

  @Delete(':id')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.WaitingQueueService.remove(id);
  }
}
