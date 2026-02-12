import { Injectable } from '@nestjs/common';
import { CreateClipgroupDto } from './dto/create-clipgroup.dto';
import { UpdateClipgroupDto } from './dto/update-clipgroup.dto';

@Injectable()
export class ClipgroupService {
  create(createClipgroupDto: CreateClipgroupDto) {
    return 'This action adds a new clipgroup';
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
