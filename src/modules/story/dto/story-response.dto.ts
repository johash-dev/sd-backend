import { UserStoryStatus } from '../entities/story.entity';

export class StoryResponseDto {
  id: string;

  title: string;

  status: UserStoryStatus;

  roomId: string;

  createdAt: Date;
}

export class UpdatedStoryResponseDto {
  id: string;
  roomId: string;
  title: string;
  status: UserStoryStatus;
  selected: boolean;
  updatedAt: Date;
}
