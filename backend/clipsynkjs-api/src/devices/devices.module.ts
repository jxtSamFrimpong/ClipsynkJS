import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Device } from './entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],  // Makes the 'Device' entity available
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService],  // Export DevicesService to be used in other modules (e.g., AuthModule)
})
export class DevicesModule {}
