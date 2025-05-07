import { UserResponseDto } from 'src/modules/user/dto/user-response.dto';

export class EstimationResponseDto {
  id: string;
  storyId: string;
  user: UserResponseDto;
  optimistic?: number;
  realistic?: number;
  pessimistic?: number;
  ready: boolean;
}
