import { Module } from '@nestjs/common';
import { ClipboardService } from './clipboard.service';
import { ClipboardController } from './clipboard.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ClipboardEvent } from './entities/clipboard.entity';
import { Clipgroup } from 'src/clipgroup/entities/clipgroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClipboardEvent, Clipgroup])],
  controllers: [ClipboardController],
  providers: [ClipboardService],
})
export class ClipboardModule {}
