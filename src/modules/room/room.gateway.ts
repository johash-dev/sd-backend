import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/util/constants';
import { JwtUserPayload } from 'src/common/types';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { Story } from '../story/entities/story.entity';
import { StoryResponseDto, UpdatedStoryResponseDto } from '../story/dto/story-response.dto';

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
      console.log('Authentication failed', e);
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

    client.emit('createdRoom', room);
  }

  @SubscribeMessage('joinRoom')
  async joinRoomHandler(@ConnectedSocket() client: Socket, @MessageBody() roomCode: string) {
    const roomDetail = await this.roomService.joinRoom(client.data as User, roomCode);

    await client.join(roomCode);
    this.server.to(roomCode).emit('joinedRoom', roomDetail);
  }

  @SubscribeMessage('rejoinRoom')
  async rejoinRoomHandler(@ConnectedSocket() client: Socket, @MessageBody() roomCode: string) {
    const room = await this.roomService.rejoinRoom(client.data as User, roomCode);
    await client.join(room.roomCode);
    this.server.to(room.roomCode).emit('rejoined', room);
  }

  @OnEvent('story.created')
  handleOrderCreatedEvent(story: Story, storyDto: StoryResponseDto) {
    this.server.to(story.room.roomCode).emit('storyCreated', storyDto, story);
  }

  @OnEvent('story.updated')
  handleStoryUpdatedEvent(story: Story, updatedStoryDto: UpdatedStoryResponseDto) {
    console.log('emitted story.updated', updatedStoryDto);

    this.server.to(story.room.roomCode).emit('storyUpdated', updatedStoryDto, story);
  }

  @OnEvent('story.startEstimation')
  handleStartEstimationEvent(story: Story) {
    console.log('Emit storyEstimationStarted');
    console.log('ROOM CODE', story.room.roomCode);

    this.server.to(story.room.roomCode).emit('storyEstimationStarted');
  }
}
