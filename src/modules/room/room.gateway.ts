import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/util/constants';
import { JwtUserPayload } from 'src/common/types';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private roomService: RoomService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.auth['token'] as string;
    console.log('connection');
    try {
      const payload: JwtUserPayload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });

      const user: User = await this.userService.findOneById(payload.id);

      client.data = user;
    } catch (e) {
      console.log('Authentication failed');
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('createRoom')
  async createRoomHandler(
    @ConnectedSocket() client: Socket,
    @MessageBody() createRoomDto: CreateRoomDto,
  ) {
    const room = await this.roomService.create(client.data as User, createRoomDto);
    await client.join(room.roomCode);
    console.log('client joined', room.roomCode);

    client.emit('createdRoom', room);
  }

  @SubscribeMessage('joinRoom')
  async joinRoomHandler(@ConnectedSocket() client: Socket, @MessageBody() roomCode: string) {
    console.log('join room');

    const roomDetail = await this.roomService.joinRoom(client.data as User, roomCode);
    // console.log('roomDetail', roomDetail);
    await client.join(roomCode);
    this.server.to(roomCode).emit('joinedRoom', roomDetail);
  }
}
