import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { SelectStoryDto } from '../dtos/input/select-story.dto';

@Injectable()
export class SelectStoryHandler {
  constructor(private readonly server: Server) {}

  execute(client: Socket, data: SelectStoryDto) {
    this.server.to(data.roomCode).emit(SOCKET_EVENTS.SELECTED_STORY, data);
  }
}
