import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../user/entities/user.entity';
import { Participant } from '../participant/entities/participant.entity';
import { ParticipantService } from '../participant/participant.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepositiry: Repository<Room>,
    private participantService: ParticipantService,
    private eventEmitter: EventEmitter2,
  ) {}

  create(user: User, createRoomDto: CreateRoomDto): Promise<Room> {
    const room = new Room();
    room.title = createRoomDto.title;
    room.owner = user;

    return this.roomRepositiry.save(room);
  }

  async joinRoom(user: User, roomCode: string) {
    const room = await this.getRoom(roomCode);

    if (room.owner.id === user.id) {
      return room;
    }

    const existingParticipant = await this.participantService.getByIdAndRoomCode(user.id, room.id);

    if (existingParticipant) {
      return room;
    }

    const participant = new Participant();
    participant.room = room;
    participant.user = user;

    const part = await this.participantService.create(participant);
    if (part) {
      const updatedRoom = await this.getRoom(roomCode);
      return updatedRoom;
    }
  }

  async getRoom(roomCode: string) {
    const room = await this.roomRepositiry.findOne({
      where: { roomCode },
      relations: ['owner', 'stories', 'participants', 'participants.user'],
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async findById(roomId: string) {
    const room = await this.roomRepositiry.findOne({
      where: { id: roomId },
      relations: ['owner', 'stories'],
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async rejoinRoom(user: User, roomCode: string) {
    const room = await this.getRoom(roomCode);
    if (room.owner.id === user.id) {
      return room;
    } else {
      const existingParticipant = room.participants.filter(
        (participant) => participant.user.id === user.id,
      );
      if (existingParticipant) {
        return room;
      } else {
        throw new HttpException('You are not a participant in this room', HttpStatus.BAD_GATEWAY);
      }
    }
  }

  // async getAllParticipants(roomId: string) {
  //   const room = await this.findById(roomId);

  // }
}
