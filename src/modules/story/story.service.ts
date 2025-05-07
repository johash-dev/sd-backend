import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story, UserStoryStatus } from './entities/story.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { RoomService } from '../room/room.service';
import { User } from '../user/entities/user.entity';
import { StoryResponseDto } from './dto/story-response.dto';
import { SelectStoryDto } from './dto/select-story.dto';
import { StartEstimationDto } from './dto/start-estimation.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
    private roomService: RoomService,
  ) {}

  async getStory(id: string) {
    const story = await this.storyRepository.findOne({
      where: { id },
      relations: ['room', 'estimations'],
    });
    if (!story) {
      throw new NotFoundException('Story Not Found');
    }

    return story;
  }

  async getById(storyId: string) {
    const story = await this.storyRepository.findOne({
      where: { id: storyId },
      relations: ['room', 'estimations'],
    });
    if (!story) {
      throw new NotFoundException('Story Not Found');
    }

    const storyResponseDto = new StoryResponseDto();
    storyResponseDto.id = story.id;
    storyResponseDto.roomId = story.room.id;
    storyResponseDto.title = story.title;
    storyResponseDto.status = story.status;
    storyResponseDto.selected = story.selected;

    return storyResponseDto;
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

    return await this.getById(savedStory.id);
  }

  async selectStory(selectStoryDto: SelectStoryDto) {
    const roomDto = await this.roomService.getRoom(selectStoryDto.roomCode);
    const room = await this.roomService.findById(roomDto.id);
    room.stories.forEach((story) => {
      if (story.id === selectStoryDto.storyId) {
        story.selected = true;
      } else {
        story.selected = false;
      }
    });

    await this.roomService.save(room);
    return await this.roomService.getRoom(room.roomCode);
  }

  async startEstimation(startEstimationDto: StartEstimationDto) {
    const room = await this.roomService.findById(startEstimationDto.roomId);
    room.stories.forEach((story) => {
      if (story.id === startEstimationDto.storyId) {
        story.status = UserStoryStatus.ACTIVE;
      }
      story.selected = false;
    });
    await this.roomService.save(room);
    return await this.roomService.getRoom(room.roomCode);
  }
}
