import { Injectable } from '@nestjs/common';
import { CreateEstimationDto } from './dto/create-estimation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estimation } from './entities/estimation.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { StoryService } from '../story/story.service';

@Injectable()
export class EstimationService {
  constructor(
    @InjectRepository(Estimation) private estimationsRepository: Repository<Estimation>,
    private storyService: StoryService,
  ) {}

  async create(user: User, createEstimationDto: CreateEstimationDto) {
    const story = await this.storyService.getById(createEstimationDto.storyId);
    const estimation = new Estimation();
    estimation.story = story;
    estimation.user = user;
    estimation.ready = createEstimationDto.ready;
    estimation.optimistic = createEstimationDto.optimistic;
    estimation.realistic = createEstimationDto.realistic;
    estimation.pessimistic = createEstimationDto.pessimistic;
    return await this.estimationsRepository.save(estimation);
  }
}
