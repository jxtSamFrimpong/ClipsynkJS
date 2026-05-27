import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException, Req } from '@nestjs/common';
import { ClipboardService } from './clipboard.service';
import { CreateClipboardDto } from './dto/create-clipboard.dto';
import { UpdateClipboardDto } from './dto/update-clipboard.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard.jwt';
import { ClipboardEvent } from './entities/clipboard.entity';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('clipboard')
export class ClipboardController {
  constructor(private readonly clipboardService: ClipboardService) { }

  @Post()
  async create(@Body() createClipboardDto: CreateClipboardDto, @Req() req: Request) {
    const userId = (req.user as any).id;
    return await this.clipboardService.create(createClipboardDto, userId);
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '7',
  ): Promise<{ data: ClipboardEvent[]; total: number }> {
    const MAX_LIMIT = 100;
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1 || parsedLimit > MAX_LIMIT) {
      throw new BadRequestException('Invalid page or limit');
    }

    const safePage = Math.max(parsedPage, 1);
    const safeLimit = Math.min(Math.max(parsedLimit, 1), MAX_LIMIT);


    const response = await this.clipboardService.findAll({ page: safePage, limit: safeLimit });
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clipboardService.findOne(+id);
  }

  //TODO: product design decidion is needed on whether clipboard events updates and deletes should be allowed, up until that is decided, it is blocked
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClipboardDto: UpdateClipboardDto) {
  //   return this.clipboardService.update(+id, updateClipboardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clipboardService.remove(+id);
  // }
}
