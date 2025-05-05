import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { RevealVotesDto } from '../dtos/input/reveal-votes.dto';

@Injectable()
export class RevealVotesHandler {
  execute(server: Server, client: Socket, data: RevealVotesDto) {
    server.to(data.roomCode).emit(SOCKET_EVENTS.REVEALED, data.storyId);
  }
}
