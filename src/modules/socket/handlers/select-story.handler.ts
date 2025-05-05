import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { SelectStoryDto } from '../dtos/input/select-story.dto';

@Injectable()
export class SelectStoryHandler {
  execute(server: Server, client: Socket, data: SelectStoryDto) {
    server.to(data.roomCode).emit(SOCKET_EVENTS.SELECTED_STORY, data);
  }
}
