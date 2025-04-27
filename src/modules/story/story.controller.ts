import { Body, Controller, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { AuthUser } from 'src/common/decorators';
import { User } from '../user/entities/user.entity';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  createStory(@AuthUser() user: User, @Body() createStoryDto: CreateStoryDto) {
    return this.storyService.create(user.id, createStoryDto);
  }
}
