import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { DevicesModule } from 'src/devices/devices.module';
import { ClipgroupModule } from 'src/clipgroup/clipgroup.module';

@Module({
  imports: [UsersModule, DevicesModule, ClipgroupModule],  // Add any necessary modules here (e.g., UsersModule, DevicesModule)
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
