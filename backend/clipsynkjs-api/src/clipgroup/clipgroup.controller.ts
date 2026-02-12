import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClipgroupService } from './clipgroup.service';
import { CreateClipgroupDto } from './dto/create-clipgroup.dto';
import { UpdateClipgroupDto } from './dto/update-clipgroup.dto';

@Controller('clipgroup')
export class ClipgroupController {
  constructor(private readonly clipgroupService: ClipgroupService) {}

  @Post()
  create(@Body() createClipgroupDto: CreateClipgroupDto) {
    return this.clipgroupService.create(createClipgroupDto);
  }

  @Get()
  findAll() {
    return this.clipgroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clipgroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClipgroupDto: UpdateClipgroupDto) {
    return this.clipgroupService.update(+id, updateClipgroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clipgroupService.remove(+id);
  }
}
