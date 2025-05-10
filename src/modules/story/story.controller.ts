import { Body, Controller, Patch, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { AuthUser } from 'src/common/decorators';
import { User } from '../user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SelectStoryDto } from './dto/select-story.dto';
import { StoryResponseDto } from './dto/story-response.dto';
import { StartEstimationDto } from './dto/start-estimation.dto';
import { RevealStoryEstimateDto } from './dto/reveal-story-estimate.dto';

@ApiBearerAuth('access-token')
@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  async createStory(
    @AuthUser() user: User,
    @Body() createStoryDto: CreateStoryDto,
  ): Promise<StoryResponseDto> {
    return await this.storyService.create(user, createStoryDto);
  }

  @Patch('select')
  async selectStory(@AuthUser() user: User, @Body() selectStoryDto: SelectStoryDto) {
    return await this.storyService.selectStory(selectStoryDto);
  }

  @Patch('startEstimation')
  async startEstimation(@AuthUser() user: User, @Body() startEstimationDto: StartEstimationDto) {
    return await this.storyService.startEstimation(startEstimationDto);
  }

  @Patch('revealEstimate')
  async revealEstimate(@AuthUser() user: User, @Body() revealEstimateDto: RevealStoryEstimateDto) {
    return await this.storyService.revealEstimate(revealEstimateDto);
  }
}
