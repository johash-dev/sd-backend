import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { CreateStoryDto } from './dto/create-story.dto';
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
      this.eventEmitter.emit('story.created', story);
    }

    return {
      id: savedStory.id,
      roomId: savedStory.room.id,
      title: savedStory.title,
      status: savedStory.status,
      createdAt: savedStory.createdAt,
    };
  }
}
