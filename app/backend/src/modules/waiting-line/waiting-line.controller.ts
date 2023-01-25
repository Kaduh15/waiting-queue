import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, Headers } from '@nestjs/common';
import { WaitingLineService } from './waiting-line.service';
import { CreateWaitingLineDto } from './dto/create-waiting-line.dto';
import { UpdateWaitingLineDto } from './dto/update-waiting-line.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('Waiting Line')
@Controller('waiting-line')
export class WaitingLineController {
  constructor(private readonly waitingLineService: WaitingLineService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async create(@Body() createWaitingLineDto: CreateWaitingLineDto, @Headers() headers: Headers) {
    return this.waitingLineService.create(createWaitingLineDto);
  }

  @Get()
  async findAll() {
    return this.waitingLineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.waitingLineService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateWaitingLineDto: UpdateWaitingLineDto) {
    return this.waitingLineService.update(+id, updateWaitingLineDto);
  }

  @Delete(':id')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.waitingLineService.remove(+id);
  }
}
