import { Module } from '@nestjs/common';
import { RoomGateway } from './gateway/room.gateway';
import { CreateRoomHandler } from './handlers/create-room.handler';
import { JoinRoomHandler } from './handlers/join-room.handler';

@Module({
  providers: [RoomGateway, CreateRoomHandler, JoinRoomHandler],
})
export class SocketModule {}
