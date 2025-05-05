import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JoinRoomDto } from '../dtos/input/join-room.dto';
import { SOCKET_EVENTS } from '../constants/socket-events';

@Injectable()
export class CreateRoomHandler {
  async execute(client: Socket, data: JoinRoomDto) {
    await client.join(data.roomCode);
    client.emit(SOCKET_EVENTS.CREATED_ROOM, data);
  }
}
