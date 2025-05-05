import { StorySummaryDto } from 'src/modules/story/dto/story-summary.dto';
import { UserResponseDto } from 'src/modules/user/dto/user-response.dto';

export class RoomResponseDto {
  id: string;
  title: string;
  description?: string;
  roomCode: string;
  owner: UserResponseDto;
  participants: UserResponseDto[];
  stories: StorySummaryDto[];
}
