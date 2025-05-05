import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { CreateStoryDto } from '../dtos/input/create-story.dto';

@Injectable()
export class CreateStoryHandler {
  execute(server: Server, client: Socket, data: CreateStoryDto) {
    server.to(data.roomCode).emit(SOCKET_EVENTS.CREATED_STORY, data);
  }
}
