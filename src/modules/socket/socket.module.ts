import { Module } from '@nestjs/common';
import { RoomGateway } from './gateway/room.gateway';
import { CreateRoomHandler } from './handlers/create-room.handler';
import { JoinRoomHandler } from './handlers/join-room.handler';
import { SelectStoryHandler } from './handlers/select-story.handler';
import { StartEstimationHandler } from './handlers/start-estimation.handler';
import { UserReadyHandler } from './handlers/user-ready.handler';
import { CreateStoryHandler } from './handlers/create-story.handler';
import { RevealVotesHandler } from './handlers/reveal-votes.handler';

@Module({
  providers: [
    RoomGateway,
    CreateRoomHandler,
    JoinRoomHandler,
    SelectStoryHandler,
    StartEstimationHandler,
    UserReadyHandler,
    CreateStoryHandler,
    RevealVotesHandler,
  ],
  exports: [
    RoomGateway,
    CreateRoomHandler,
    JoinRoomHandler,
    SelectStoryHandler,
    StartEstimationHandler,
    UserReadyHandler,
    CreateStoryHandler,
    RevealVotesHandler,
  ],
})
export class SocketModule {}
