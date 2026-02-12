import { Module } from '@nestjs/common';
import { ClipgroupService } from './clipgroup.service';
import { ClipgroupController } from './clipgroup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clipgroup } from './entities/clipgroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clipgroup])],  // Add your entities here
  controllers: [ClipgroupController],
  providers: [ClipgroupService],
})
export class ClipgroupModule {}
