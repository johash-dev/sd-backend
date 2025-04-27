import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { RoomService } from '../room/room.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
    private roomService: RoomService,
  ) {}

  async create(user: User, createStoryDto: CreateStoryDto) {
    const room = await this.roomService.findById(createStoryDto.roomId);

    console.log(room, user);

    if (room.owner.id !== user.id) {
      throw new UnauthorizedException('User not authorized to create stories for this room');
    }

    const story = new Story();
    story.room = room;
    story.title = createStoryDto.title;

    return this.storyRepository.save(story);
  }
}
