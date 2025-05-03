import { UserStoryStatus } from '../entities/story.entity';

export class StoryResponseDto {
  id: string;

  title: string;

  status: UserStoryStatus;

  roomId: string;

  createdAt: Date;
}
