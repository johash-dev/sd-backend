import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { CreateStoryDto } from '../dtos/input/create-story.dto';

@Injectable()
export class CreateStoryHandler {
  constructor(private readonly server: Server) {}

  execute(client: Socket, data: CreateStoryDto) {
    this.server.to(data.roomCode).emit(SOCKET_EVENTS.CREATED_STORY, data);
  }
}
