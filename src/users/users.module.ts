import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { HolidaysEntity } from './entities/holiday.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, HolidaysEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
