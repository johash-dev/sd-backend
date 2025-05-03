import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { AuthModule } from '../auth/auth.module';
import { RoomModule } from '../room/room.module';

@Module({
  controllers: [StoryController],
  providers: [StoryService],
  imports: [TypeOrmModule.forFeature([Story]), AuthModule, RoomModule],
  exports: [StoryService],
})
export class StoryModule {}
