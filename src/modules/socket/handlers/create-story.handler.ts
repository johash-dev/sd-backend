import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { CreateStoryDto } from '../dtos/input/create-story.dto';
import { SOCKET_SERVER } from '../constants/socket';

@Injectable()
export class CreateStoryHandler {
  constructor(@Inject(SOCKET_SERVER) private readonly server: Server) {}

  execute(client: Socket, data: CreateStoryDto) {
    this.server.to(data.roomCode).emit(SOCKET_EVENTS.CREATED_STORY, data);
  }
}
