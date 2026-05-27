import { createHash } from 'node:crypto';

import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateClipboardDto } from './dto/create-clipboard.dto';
import { UpdateClipboardDto } from './dto/update-clipboard.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClipboardEvent, getStorageStrategy } from './entities/clipboard.entity';
import { Clipgroup } from 'src/clipgroup/entities/clipgroup.entity';

@Injectable()
export class ClipboardService {
  constructor(
    @InjectRepository(ClipboardEvent)
    private clipboardEventRepository: Repository<ClipboardEvent>,
    @InjectRepository(Clipgroup)
    private clipgroupRepository: Repository<Clipgroup>,
  ) { }

  async create(createClipboardDto: CreateClipboardDto, userId: string): Promise<ClipboardEvent> {
    try {
      const storageStrategy = getStorageStrategy(
        createClipboardDto.mimeType,
        createClipboardDto.mimeType.includes('text/plain') ? Buffer.byteLength(createClipboardDto.content, 'utf-8') : createClipboardDto.content.length
      );

      const contentHash = createClipboardDto.contentHash ??
      createHash('sha256')
      .update(createClipboardDto.content ?? '')
      .digest('hex');

      // If no clipgroup provided, default to the user's default clipgroup
      let clipgroupId = createClipboardDto.clipboardgroup;
      if (!clipgroupId) {
        const defaultGroup = await this.clipgroupRepository.findOne({
          where: { owner: { id: userId }, isDefaultGroup: true },
        });
        if (!defaultGroup) {
          throw new BadRequestException('No default clipgroup found for this user');
        }
        clipgroupId = defaultGroup.id;
      }

      const event = new ClipboardEvent()
      Object.assign(event, createClipboardDto, { storageStrategy, contentHash, clipboardgroup: clipgroupId, sourceUserId: userId });
      return await this.clipboardEventRepository.save(event);
    }
    catch (error) {
      console.error('Error creating clipboard event:', error);
      throw error; // Rethrow the error to be handled by the controller
    }
  }

  async findAll({ page, limit }: { page: number, limit: number }): Promise<{ data: ClipboardEvent[]; total: number}> {
    try {
      const [data, total] = await this.clipboardEventRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'DESC'
        }
      });
      return { data, total };
    } catch (error) {
      console.error('Error finding all clipboard events:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    //return `This action returns a #${id} clipboard`;
    return await this.clipboardEventRepository.findOneBy({id: id.toString()})
  }

  update(id: number, updateClipboardDto: UpdateClipboardDto) {
    return `This action updates a #${id} clipboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} clipboard`;
  }
}
