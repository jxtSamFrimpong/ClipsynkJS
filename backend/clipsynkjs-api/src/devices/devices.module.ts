import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Device } from './entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],  // Makes the 'Device' entity available
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
