import { Body, Controller, Patch, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto, UpdateStoryDto } from './dto/create-story.dto';
import { AuthUser } from 'src/common/decorators';
import { User } from '../user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  async createStory(@AuthUser() user: User, @Body() createStoryDto: CreateStoryDto) {
    return await this.storyService.create(user, createStoryDto);
  }

  @Patch()
  async updateStory(@AuthUser() user: User, @Body() updateStoryDto: UpdateStoryDto) {
    return await this.storyService.updateStory(user, updateStoryDto);
  }
}
