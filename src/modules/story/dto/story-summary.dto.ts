import { UserStoryStatus } from '../entities/story.entity';

export class StorySummaryDto {
  id: string;
  title: string;
  selected: boolean;
  status: UserStoryStatus;
}
