import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ClipboardService } from './clipboard.service';
import { CreateClipboardDto } from './dto/create-clipboard.dto';
import { UpdateClipboardDto } from './dto/update-clipboard.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard.jwt';
import { ClipboardEvent } from './entities/clipboard.entity';

@UseGuards(JwtAuthGuard)
@Controller('clipboard')
export class ClipboardController {
  constructor(private readonly clipboardService: ClipboardService) { }

  @Post()
  async create(@Body() createClipboardDto: CreateClipboardDto) {
    return await this.clipboardService.create(createClipboardDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '7',
  ): Promise<{ data: ClipboardEvent[]; total: number }> {
    const response = await this.clipboardService.findAll({ page: Number(page), limit: Number(limit) });
    return {
      data: response[0],
      total: response[1]
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clipboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClipboardDto: UpdateClipboardDto) {
    return this.clipboardService.update(+id, updateClipboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clipboardService.remove(+id);
  }
}
