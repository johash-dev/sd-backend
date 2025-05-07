import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstimationDto } from './dto/create-estimation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estimation } from './entities/estimation.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { StoryService } from '../story/story.service';
import { EstimationResponseDto } from './dto/estimation-response.dto';
import { RoomService } from '../room/room.service';
import { RoomResponseDto } from '../room/dto/room-response.dto';

@Injectable()
export class EstimationService {
  constructor(
    @InjectRepository(Estimation) private estimationsRepository: Repository<Estimation>,
    private storyService: StoryService,
    private roomService: RoomService,
  ) {}

  async create(user: User, createEstimationDto: CreateEstimationDto): Promise<RoomResponseDto> {
    const story = await this.storyService.getStory(createEstimationDto.storyId);
    const estimation = new Estimation();
    estimation.story = story;
    estimation.user = user;
    estimation.ready = createEstimationDto.ready;
    estimation.optimistic = createEstimationDto.optimistic;
    estimation.realistic = createEstimationDto.realistic;
    estimation.pessimistic = createEstimationDto.pessimistic;
    await this.estimationsRepository.save(estimation);

    const updatedRoom = await this.roomService.findById(createEstimationDto.roomId);
    return await this.roomService.getRoom(updatedRoom.roomCode);
  }

  async getById(id: string): Promise<EstimationResponseDto> {
    const estimation = await this.estimationsRepository.findOne({ where: { id } });
    if (!estimation) {
      throw new NotFoundException('Estimation not found');
    }

    const response = new EstimationResponseDto();
    response.id = estimation.id;
    response.storyId = estimation.story.id;
    response.user = {
      id: estimation.user.id,
      email: estimation.user.email,
      firstName: estimation.user.firstName,
    };
    response.ready = estimation.ready;
    response.optimistic = estimation.optimistic;
    response.realistic = estimation.realistic;
    response.pessimistic = estimation.pessimistic;

    return response;
  }
}
