import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { ReEstimateDto } from '../dtos/input/re-estimate.dto';

@Injectable()
export class ReEstimateHandler {
  execute(server: Server, client: Socket, data: ReEstimateDto) {
    server.to(data.roomCode).emit(SOCKET_EVENTS.STARTED_ESTIMATION, data);
  }
}
