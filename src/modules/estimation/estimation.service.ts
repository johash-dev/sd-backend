import { Injectable } from '@nestjs/common';
import { CreateEstimationDto } from './dto/create-estimation.dto';
import { UpdateEstimationDto } from './dto/update-estimation.dto';

@Injectable()
export class EstimationService {
  create(createEstimationDto: CreateEstimationDto) {
    return 'This action adds a new estimation';
  }
}
