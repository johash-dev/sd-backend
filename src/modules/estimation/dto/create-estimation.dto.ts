import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEstimationDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  storyId: string;

  @IsOptional()
  optimistic?: number;

  @IsOptional()
  realistic?: number;

  @IsOptional()
  pessimistic?: number;

  @IsNotEmpty()
  ready: boolean;
}
