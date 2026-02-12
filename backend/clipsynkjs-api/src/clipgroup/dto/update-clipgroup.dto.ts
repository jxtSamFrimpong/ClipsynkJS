import { PartialType } from '@nestjs/mapped-types';
import { CreateClipgroupDto } from './create-clipgroup.dto';

export class UpdateClipgroupDto extends PartialType(CreateClipgroupDto) {}
