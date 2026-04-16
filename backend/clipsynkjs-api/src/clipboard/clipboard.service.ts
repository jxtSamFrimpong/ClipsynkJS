import { Injectable } from '@nestjs/common';
import { CreateClipboardDto } from './dto/create-clipboard.dto';
import { UpdateClipboardDto } from './dto/update-clipboard.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClipboardEvent, getStorageStrategy } from './entities/clipboard.entity';
import { take } from 'rxjs';
import { skip } from 'node:test';

@Injectable()
export class ClipboardService {
  constructor(
    @InjectRepository(ClipboardEvent)
    private clipboardEventRepository: Repository<ClipboardEvent>
  ) { }

  async create(createClipboardDto: CreateClipboardDto): Promise<ClipboardEvent> {
    try {
      const storageStrategy = getStorageStrategy(
        createClipboardDto.mimeType,
        createClipboardDto.mimeType.includes('text/plain') ? Buffer.byteLength(createClipboardDto.content, 'utf-8') : createClipboardDto.content.length
      );

      const event = new ClipboardEvent()
      Object.assign(event, createClipboardDto, { storageStrategy: storageStrategy })
      return await this.clipboardEventRepository.save(event);
    }
    catch (error) {
      console.error('Error creating clipboard event:', error);
      throw error; // Rethrow the error to be handled by the controller
    }
  }

  async findAll({ page, limit }: { page: number, limit: number }): Promise<[ClipboardEvent[], number]> {
    try {
      return await this.clipboardEventRepository.findAndCount({
        take: limit,
        skip: (page - 1),
        order: {
          createdAt: 'DESC'
        }
      });
    } catch (error) {
      console.error('Error finding all clipboard events:', error);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} clipboard`;
  }

  update(id: number, updateClipboardDto: UpdateClipboardDto) {
    return `This action updates a #${id} clipboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} clipboard`;
  }
}
