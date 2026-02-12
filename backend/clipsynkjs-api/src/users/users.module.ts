import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Makes the 'User' repository available
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
