import { PartialType } from '@nestjs/mapped-types';
import { CreateClipboardDto } from './create-clipboard.dto';

export class UpdateClipboardDto extends PartialType(CreateClipboardDto) {}
