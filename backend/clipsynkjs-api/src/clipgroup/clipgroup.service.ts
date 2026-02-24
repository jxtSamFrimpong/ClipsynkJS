import { Inject, Injectable } from '@nestjs/common';
import { CreateClipgroupDto } from './dto/create-clipgroup.dto';
import { UpdateClipgroupDto } from './dto/update-clipgroup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clipgroup } from './entities/clipgroup.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ClipgroupService {
  constructor(
    @InjectRepository(Clipgroup)
    private clipgroupRepository: Repository<Clipgroup>
  ){}
  async create(createClipgroupDto: CreateClipgroupDto) {
    const newClipgroup = this.clipgroupRepository.create(createClipgroupDto)
    return await this.clipgroupRepository.save(newClipgroup);
  }

  findAll() {
    return `This action returns all clipgroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clipgroup`;
  }

  update(id: number, updateClipgroupDto: UpdateClipgroupDto) {
    return `This action updates a #${id} clipgroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} clipgroup`;
  }
}
