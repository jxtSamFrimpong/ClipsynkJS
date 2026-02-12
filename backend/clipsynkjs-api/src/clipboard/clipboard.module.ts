import { Module } from '@nestjs/common';
import { ClipboardService } from './clipboard.service';
import { ClipboardController } from './clipboard.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ClipboardEvent } from './entities/clipboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClipboardEvent])],  // Make the 'ClipboardEvent' repository available
  controllers: [ClipboardController],
  providers: [ClipboardService],
})
export class ClipboardModule {}
