import { Module } from '@nestjs/common';
import { RoomGateway } from './gateway/room.gateway';
import { CreateRoomHandler } from './handlers/create-room.handler';
import { JoinRoomHandler } from './handlers/join-room.handler';
import { SelectStoryHandler } from './handlers/select-story.handler';
import { StartEstimationHandler } from './handlers/start-estimation.handler';

@Module({
  providers: [
    RoomGateway,
    CreateRoomHandler,
    JoinRoomHandler,
    SelectStoryHandler,
    StartEstimationHandler,
  ],
})
export class SocketModule {}
