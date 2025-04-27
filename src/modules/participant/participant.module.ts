import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  imports: [TypeOrmModule.forFeature([Participant])],
  exports: [ParticipantService],
})
export class ParticipantModule {}
