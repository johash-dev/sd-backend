import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { ParticipantModule } from '../participant/participant.module';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  imports: [TypeOrmModule.forFeature([Room]), ParticipantModule],
  exports: [RoomService],
})
export class RoomModule {}
