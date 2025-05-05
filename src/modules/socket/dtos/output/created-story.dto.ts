import { UserStoryStatus } from 'src/modules/story/entities/story.entity';

export interface CreatedStoryDto {
  roomCode: string;
  story: {
    id: string;
    title: string;
    selected: boolean;
    status: UserStoryStatus;
  };
}
