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
import { ReEstimateDto } from '../dtos/input/re-estimate.dto';
import { ReEstimateHandler } from '../handlers/re-estimate.handler';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  constructor(
    private joinRoomHandler: JoinRoomHandler,
    private createRoomHandler: CreateRoomHandler,
    private createStoryHandler: CreateStoryHandler,
    private selectStoryHandler: SelectStoryHandler,
    private startEstimationHandler: StartEstimationHandler,
    private userReadyHandler: UserReadyHandler,
    private revealVotesHandler: RevealVotesHandler,
    private reEstimateHandler: ReEstimateHandler,
  ) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('client connected', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage(SOCKET_EVENTS.CREATE_ROOM)
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() createRoomDto: JoinRoomDto,
  ) {
    await this.createRoomHandler.execute(client, createRoomDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.JOIN_ROOM)
  async handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() joinRoomDto: JoinRoomDto) {
    await this.joinRoomHandler.execute(this.server, client, joinRoomDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.CREATE_STORY)
  handleCreateStory(
    @ConnectedSocket() client: Socket,
    @MessageBody() createStoryDto: CreateStoryDto,
  ) {
    this.createStoryHandler.execute(this.server, client, createStoryDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.SELECT_STORY)
  handleSelectStory(
    @ConnectedSocket() client: Socket,
    @MessageBody() selectStoryDto: SelectStoryDto,
  ) {
    this.selectStoryHandler.execute(this.server, client, selectStoryDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.START_ESTIMATION)
  handleStartEstimation(
    @ConnectedSocket() client: Socket,
    @MessageBody() startEstimationDto: StartEstimationDto,
  ) {
    this.startEstimationHandler.execute(this.server, client, startEstimationDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.READY)
  handleUserReady(@ConnectedSocket() client: Socket, @MessageBody() readyDto: ReadyDto) {
    this.userReadyHandler.execute(this.server, client, readyDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.REVEAL_VOTES)
  handleRevealVotes(
    @ConnectedSocket() client: Socket,
    @MessageBody() revealVotesDto: RevealVotesDto,
  ) {
    this.revealVotesHandler.execute(this.server, client, revealVotesDto);
  }

  @SubscribeMessage(SOCKET_EVENTS.RE_ESTIMATE)
  handleReEstimate(@ConnectedSocket() client: Socket, @MessageBody() reEstimateDto: ReEstimateDto) {
    this.reEstimateHandler.execute(this.server, client, reEstimateDto);
  }
}
