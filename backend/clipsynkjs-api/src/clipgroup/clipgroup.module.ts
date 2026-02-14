import { Module } from '@nestjs/common';
import { ClipgroupService } from './clipgroup.service';
import { ClipgroupController } from './clipgroup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clipgroup } from './entities/clipgroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clipgroup])],  // Add your entities here
  controllers: [ClipgroupController],
  providers: [ClipgroupService],
  exports: [ClipgroupService],  // Export ClipgroupService to be used in other modules (e.g., AuthModule)
})
export class ClipgroupModule {}
