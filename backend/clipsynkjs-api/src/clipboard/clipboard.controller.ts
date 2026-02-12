import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClipboardService } from './clipboard.service';
import { CreateClipboardDto } from './dto/create-clipboard.dto';
import { UpdateClipboardDto } from './dto/update-clipboard.dto';

@Controller('clipboard')
export class ClipboardController {
  constructor(private readonly clipboardService: ClipboardService) {}

  @Post()
  async create(@Body() createClipboardDto: CreateClipboardDto) {
    return await this.clipboardService.create(createClipboardDto);
  }

  @Get()
  async findAll() {
    return await this.clipboardService.findAll();
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
