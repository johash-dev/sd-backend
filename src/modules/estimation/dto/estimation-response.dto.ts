export class EstimationResponseDto {
  id: string;
  storyId: string;
  userId: string;
  optimistic?: number;
  realistic?: number;
  pessimistic?: number;
  ready: boolean;
}
