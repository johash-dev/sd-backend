import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../user/entities/user.entity';
import { Participant } from '../participant/entities/participant.entity';
import { ParticipantService } from '../participant/participant.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepositiry: Repository<Room>,
    private participantService: ParticipantService,
  ) {}

  create(user: User, createRoomDto: CreateRoomDto) {
    const room = new Room();
    room.title = createRoomDto.title;
    room.owner = user;

    return this.roomRepositiry.save(room);
  }

  async joinRoom(user: User, roomCode: string) {
    const room = await this.getRoom(roomCode);

    const participant = new Participant();
    participant.room = room;
    participant.user = user;

    return this.participantService.create(participant);
  }

  async getRoom(roomCode: string) {
    const room = await this.roomRepositiry.findOne({
      where: { roomCode },
      relations: ['owner', 'stories', 'participants'],
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async findById(roomId: number) {
    const room = await this.roomRepositiry.findOne({
      where: { id: roomId },
      relations: ['owner', 'stories'],
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }
}
