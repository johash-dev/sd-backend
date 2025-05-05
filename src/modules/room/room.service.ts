import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../user/entities/user.entity';
import { ParticipantService } from '../participant/participant.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RoomResponseDto } from './dto/room-response.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepositiry: Repository<Room>,
    private participantService: ParticipantService,
    private eventEmitter: EventEmitter2,
  ) {}

  save(room: Room) {
    return this.roomRepositiry.save(room);
  }

  async createRoom(user: User, createRoomDto: CreateRoomDto): Promise<RoomResponseDto> {
    const room = new Room();
    room.title = createRoomDto.title;
    room.owner = user;

    await this.roomRepositiry.save(room);

    const newRoom = await this.findById(room.id);

    const roomResponseDto = new RoomResponseDto();
    roomResponseDto.id = newRoom.id;
    roomResponseDto.title = newRoom.title;
    roomResponseDto.description = newRoom.description;
    roomResponseDto.owner = {
      id: newRoom.owner.id,
      email: newRoom.owner.email,
      firstName: newRoom.owner.firstName,
    };
    roomResponseDto.participants =
      newRoom.participants.map((participant) => {
        return {
          id: participant.id,
          email: participant.email,
          firstName: participant.firstName,
        };
      }) ?? [];
    roomResponseDto.stories =
      newRoom.stories.map((story) => {
        return {
          id: story.id,
          title: story.title,
          selected: story.selected,
          status: story.status,
        };
      }) ?? [];

    return roomResponseDto;
  }

  async joinRoom(user: User, roomCode: string) {
    const room = await this.getRoom(roomCode);

    if (room.owner.id === user.id) {
      return room;
    }

    const existingParticipant = room.participants.filter(
      (participant) => participant.id === user.id,
    );

    if (existingParticipant.length) {
      return room;
    }

    room.participants.push(user);

    const savedRoom = await this.roomRepositiry.save(room);
    if (savedRoom) {
      const updatedRoom = await this.getRoom(roomCode);

      return updatedRoom;
    }
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

  async findById(roomId: string) {
    const room = await this.roomRepositiry.findOne({
      where: { id: roomId },
      relations: ['owner', 'stories', 'participants'],
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
        (participant) => participant.id === user.id,
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
