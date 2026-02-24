import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { DevicesModule } from 'src/devices/devices.module';
import { ClipgroupModule } from 'src/clipgroup/clipgroup.module';
import { MailModule } from 'src/utils/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { appconfig } from '../utils/config';
import { PasswordResetAuthGuard } from './guards/auth.guard';
import { DeviceAuthGuard } from './guards/auth.guards.devices';
import { Device } from 'src/devices/entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [UsersModule, DevicesModule, ClipgroupModule, MailModule,
    PassportModule,
    JwtModule.register({
      secret: appconfig.auth.jwtSecret, //TODO
      signOptions: { expiresIn: '15m' }, //TODO
    }),
    TypeOrmModule.forFeature([Device]),
  ],  // Add any necessary modules here (e.g., UsersModule, DevicesModule)
  controllers: [AuthController],
  providers: [AuthService, PasswordResetAuthGuard, DeviceAuthGuard],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
