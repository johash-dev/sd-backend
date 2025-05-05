import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { StartEstimationDto } from '../dtos/input/start-estimation.dto';
import { StartedEstimationDto } from '../dtos/output/started-estimation.dto';
import { SOCKET_SERVER } from '../constants/socket';

@Injectable()
export class StartEstimationHandler {
  constructor(@Inject(SOCKET_SERVER) private readonly server: Server) {}

  execute(client: Socket, data: StartEstimationDto) {
    const response: StartedEstimationDto = {
      storyId: data.storyId,
    };
    this.server.to(data.roomCode).emit(SOCKET_EVENTS.STARTED_ESTIMATION, response);
  }
}
