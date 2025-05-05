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
import { JoinRoomHandler } from '../handlers/join-room.handler';
import { CreateRoomHandler } from '../handlers/create-room.handler';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { JoinRoomDto } from '../dtos/input/join-room.dto';
import { CreateStoryDto } from '../dtos/input/create-story.dto';
import { CreateStoryHandler } from '../handlers/create-story.handler';
import { SelectStoryHandler } from '../handlers/select-story.handler';
import { SelectStoryDto } from '../dtos/input/select-story.dto';
import { StartEstimationDto } from '../dtos/input/start-estimation.dto';
import { StartEstimationHandler } from '../handlers/start-estimation.handler';
import { UserReadyHandler } from '../handlers/user-ready.handler';
import { ReadyDto } from '../dtos/input/ready.dto';
import { RevealVotesHandler } from '../handlers/reveal-votes.handler';
import { RevealVotesDto } from '../dtos/input/reveal-votes.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private joinRoomHandler: JoinRoomHandler,
    private createRoomHandler: CreateRoomHandler,
    private createStoryHandler: CreateStoryHandler,
    private selectStoryHandler: SelectStoryHandler,
    private startEstimationHandler: StartEstimationHandler,
    private userReadyHandler: UserReadyHandler,
    private revealVotesHandler: RevealVotesHandler,
  ) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('client connected', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage(SOCKET_EVENTS.CREATE_ROOM)
  handleCreateRoom(@ConnectedSocket() client: Socket, @MessageBody() createRoomDto: JoinRoomDto) {
    this.createRoomHandler.execute(client, createRoomDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.JOIN_ROOM)
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() joinRoomDto: JoinRoomDto) {
    this.joinRoomHandler.execute(client, joinRoomDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.CREATE_STORY)
  handleCreateStory(
    @ConnectedSocket() client: Socket,
    @MessageBody() createStoryDto: CreateStoryDto,
  ) {
    this.createStoryHandler.execute(client, createStoryDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.SELECT_STORY)
  handleSelectStory(
    @ConnectedSocket() client: Socket,
    @MessageBody() selectStoryDto: SelectStoryDto,
  ) {
    this.selectStoryHandler.execute(client, selectStoryDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.START_ESTIMATION)
  handleStartEstimation(
    @ConnectedSocket() client: Socket,
    @MessageBody() startEstimationDto: StartEstimationDto,
  ) {
    this.startEstimationHandler.execute(client, startEstimationDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.READY)
  handleUserReady(@ConnectedSocket() client: Socket, @MessageBody() readyDto: ReadyDto) {
    this.userReadyHandler.execute(client, readyDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.REVEAL_VOTES)
  handleRevealVotes(
    @ConnectedSocket() client: Socket,
    @MessageBody() revealVotesDto: RevealVotesDto,
  ) {
    this.revealVotesHandler.execute(client, revealVotesDto);
  }

  // @SubscribeMessage('joinRoom')
  // async joinRoomHandler(@ConnectedSocket() client: Socket, @MessageBody() roomCode: string) {
  //   const roomDetail = await this.roomService.joinRoom(client.data as User, roomCode);

  //   await client.join(roomCode);
  //   this.server.to(roomCode).emit('joinedRoom', roomDetail);
  // }

  // @SubscribeMessage('rejoinRoom')
  // async rejoinRoomHandler(@ConnectedSocket() client: Socket, @MessageBody() roomCode: string) {
  //   const room = await this.roomService.rejoinRoom(client.data as User, roomCode);
  //   await client.join(room.roomCode);
  //   this.server.to(room.roomCode).emit('rejoined', room);
  // }

  // @OnEvent('story.created')
  // handleOrderCreatedEvent(story: Story, storyDto: StoryResponseDto) {
  //   this.server.to(story.room.roomCode).emit('storyCreated', storyDto, story);
  // }

  // @OnEvent('story.updated')
  // handleStoryUpdatedEvent(story: Story, updatedStoryDto: UpdatedStoryResponseDto) {
  //   this.server.to(story.room.roomCode).emit('storyUpdated', updatedStoryDto, story);
  // }

  // @OnEvent('story.startEstimation')
  // handleStartEstimationEvent(story: Story) {
  //   this.server.to(story.room.roomCode).emit('storyEstimationStarted');
  // }

  // @OnEvent('story.storySelected')
  // handleSelectStoryEvent(stories: Story[], roomCode: string) {
  //   this.server.to(roomCode).emit('storySelected', stories);
  // }
}
