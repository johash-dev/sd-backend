import { Module } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { EstimationController } from './estimation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estimation } from './entities/estimation.entity';
import { StoryModule } from '../story/story.module';
import { RoomModule } from '../room/room.module';

@Module({
  controllers: [EstimationController],
  providers: [EstimationService],
  imports: [TypeOrmModule.forFeature([Estimation]), StoryModule, RoomModule],
  exports: [EstimationService],
})
export class EstimationModule {}
