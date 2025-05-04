import { Controller, Post, Body } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { CreateEstimationDto } from './dto/create-estimation.dto';
import { AuthUser } from 'src/common/decorators';
import { User } from '../user/entities/user.entity';

@Controller('estimation')
export class EstimationController {
  constructor(private readonly estimationService: EstimationService) {}

  @Post()
  create(@AuthUser() user: User, @Body() createEstimationDto: CreateEstimationDto) {
    return this.estimationService.create(user, createEstimationDto);
  }
}
