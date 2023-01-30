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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { WaitingLine } from './entities/waiting-line.entity';

@ApiTags('Waiting Line')
@Controller('waiting-line')
export class WaitingLineController {
  constructor(private readonly waitingLineService: WaitingLineService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async create(
    @Body() createWaitingLineDto: CreateWaitingLineDto,
    @Headers() headers: Headers,
  ) {
    return this.waitingLineService.create(createWaitingLineDto);
  }

  @Get()
  async findAll() {
    return this.waitingLineService.findAll();
  }

  @Get('today')
  async getClientsToday() {
    return this.waitingLineService.getClientsToday();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.waitingLineService.findOne(id);
  }

  @Patch(':id/start')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Client started service',
    type: WaitingLine,
  })
  async startService(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.waitingLineService.startService(id);
  }

  @Patch(':id/finish')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async finishService(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.waitingLineService.finishService(id);
  }

  @Patch(':id')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateWaitingLineDto: UpdateWaitingLineDto,
  ) {
    return this.waitingLineService.update(id, updateWaitingLineDto);
  }

  @Delete(':id')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.waitingLineService.remove(id);
  }
}
