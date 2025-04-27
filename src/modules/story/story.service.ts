import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { RoomService } from '../room/room.service';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
    private roomService: RoomService,
  ) {}

  async create(userId: number, createStoryDto: CreateStoryDto) {
    const canCreateStory = await this.canCreateStory(userId, createStoryDto.roomId);

    if (!canCreateStory) {
      throw new BadRequestException();
    }

    const story = new Story();
    story.roomId = createStoryDto.roomId;
    story.title = createStoryDto.title;

    return this.storyRepository.save(story);
  }

  private async canCreateStory(userId: number, roomId: number): Promise<boolean> {
    console.log('userId', userId);
    console.log('roomId', roomId);

    const room = await this.roomService.findById(roomId);

    console.log(room);

    return userId === room.ownerId;
  }
}
