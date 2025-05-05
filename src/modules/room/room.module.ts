import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  imports: [TypeOrmModule.forFeature([Room]), UserModule],
  exports: [RoomService],
})
export class RoomModule {}
