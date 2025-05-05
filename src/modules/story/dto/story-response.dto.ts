import { UserStoryStatus } from '../entities/story.entity';

export class StoryResponseDto {
  id: string;
  roomId: string;
  title: string;
  status: UserStoryStatus;
  selected: boolean;
}

export class UpdatedStoryResponseDto {
  id: string;
  roomId: string;
  title: string;
  status: UserStoryStatus;
  selected: boolean;
  updatedAt: Date;
}
