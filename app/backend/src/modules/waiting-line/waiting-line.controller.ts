import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WaitingLineService } from './waiting-line.service';
import { CreateWaitingLineDto } from './dto/create-waiting-line.dto';
import { UpdateWaitingLineDto } from './dto/update-waiting-line.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Waiting Line')
@Controller('waiting-line')
export class WaitingLineController {
  constructor(private readonly waitingLineService: WaitingLineService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async create(@Body() createWaitingLineDto: CreateWaitingLineDto) {
    return this.waitingLineService.create(createWaitingLineDto);
  }

  @Get()
  async findAll() {
    return this.waitingLineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.waitingLineService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateWaitingLineDto: UpdateWaitingLineDto) {
    return this.waitingLineService.update(+id, updateWaitingLineDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return this.waitingLineService.remove(+id);
  }
}