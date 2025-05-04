import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story, UserStoryStatus } from './entities/story.entity';
import { CreateStoryDto, UpdateStoryDto } from './dto/create-story.dto';
import { RoomService } from '../room/room.service';
import { User } from '../user/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StoryResponseDto } from './dto/story-response.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
    private roomService: RoomService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getById(storyId: string) {
    const story = await this.storyRepository.findOne({
      where: { id: storyId },
      relations: ['room', 'estimations'],
    });
    if (!story) {
      throw new NotFoundException('Story Not Found');
    }

    return story;
  }

  async create(user: User, createStoryDto: CreateStoryDto): Promise<StoryResponseDto> {
    const room = await this.roomService.findById(createStoryDto.roomId);

    if (room.owner.id !== user.id) {
      throw new UnauthorizedException('User not authorized to create stories for this room');
    }

    const story = new Story();
    story.room = room;
    story.title = createStoryDto.title;

    const savedStory = await this.storyRepository.save(story);

    if (savedStory) {
      this.eventEmitter.emit('story.created', savedStory, {
        id: savedStory.id,
        roomId: savedStory.room.id,
        title: savedStory.title,
        status: savedStory.status,
        createdAt: savedStory.createdAt,
      });
    }

    return {
      id: savedStory.id,
      roomId: savedStory.room.id,
      title: savedStory.title,
      status: savedStory.status,
      createdAt: savedStory.createdAt,
    };
  }

  async updateStory(user: User, updateStoryDto: UpdateStoryDto) {
    const story = await this.storyRepository.findOne({
      where: { id: updateStoryDto.id },
      relations: ['room'],
    });
    const room = await this.roomService.findById(updateStoryDto.roomId);

    if (room.owner.id !== user.id) {
      throw new UnauthorizedException('Only room owner can update stories');
    }

    if (story) {
      story.selected = updateStoryDto.selected ?? story.selected;
      story.status = updateStoryDto.status ?? story.status;
      story.title = updateStoryDto.title ?? story.title;
      this.eventEmitter.emit('story.updated', story, {
        id: story.id,
        roomId: story.room.id,
        title: story.title,
        status: story.status,
        selected: story.selected,
        updatedAt: story.updatedAt,
      });
      if (story.status === UserStoryStatus.IN_ESTIMATION) {
        this.eventEmitter.emit('story.startEstimation', story);
      }
      return this.storyRepository.save(story);
    }
  }
}
