import { ConflictException, Injectable } from '@nestjs/common';
import { Participant } from './entities/participant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant) private partcipantRepository: Repository<Participant>,
  ) {}

  async create(participant: Participant) {
    try {
      return await this.partcipantRepository.save(participant);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new ConflictException('User already joined this room');
      }
    }
  }
}
