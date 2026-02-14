import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Makes the 'User' repository available
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],  // Export UsersService to be used in other modules (e.g., AuthModule)
})
export class UsersModule {}
