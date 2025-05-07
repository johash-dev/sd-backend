import { EstimationResponseDto } from 'src/modules/estimation/dto/estimation-response.dto';
import { UserStoryStatus } from '../entities/story.entity';

export class StorySummaryDto {
  id: string;
  title: string;
  selected: boolean;
  status: UserStoryStatus;
  estimations?: EstimationResponseDto[];
}
