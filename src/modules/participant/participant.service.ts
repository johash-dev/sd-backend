import { Injectable } from '@nestjs/common';
import { Participant } from './entities/participant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant) private partcipantRepository: Repository<Participant>,
  ) {}

  create(participant: Participant) {
    return this.partcipantRepository.save(participant);
  }
}
