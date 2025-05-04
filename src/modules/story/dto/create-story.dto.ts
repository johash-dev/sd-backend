import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserStoryStatus } from '../entities/story.entity';

export class CreateStoryDto {
  @IsNotEmpty({ message: 'Room id is required' })
  @ApiProperty()
  roomId: string;

  @IsNotEmpty({ message: 'Room title is required' })
  @ApiProperty()
  title: string;
}

export class UpdateStoryDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  roomId: string;

  @IsOptional()
  @ApiProperty({ nullable: true })
  title?: string;

  @IsOptional()
  @ApiProperty({ nullable: true })
  selected?: boolean;

  @IsOptional()
  @ApiProperty({ nullable: true })
  status?: UserStoryStatus;

  @IsOptional()
  @ApiProperty({ nullable: true })
  optimistic?: number;

  @IsOptional()
  @ApiProperty({ nullable: true })
  realistic?: number;

  @IsOptional()
  @ApiProperty({ nullable: true })
  pessimistic?: number;

  @IsOptional()
  @ApiProperty({ nullable: true })
  ready?: boolean;
}
