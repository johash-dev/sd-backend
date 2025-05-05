import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../user/entities/user.entity';
import { JoinRoomResponseDto, RoomResponseDto } from './dto/room-response.dto';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepositiry: Repository<Room>) {}

  save(room: Room) {
    return this.roomRepositiry.save(room);
  }

  async createRoom(user: User, createRoomDto: CreateRoomDto): Promise<RoomResponseDto> {
    const room = new Room();
    room.title = createRoomDto.title;
    room.owner = user;

    await this.roomRepositiry.save(room);

    return await this.getRoom(room.roomCode);
  }

  async joinRoom(user: User, roomCode: string): Promise<JoinRoomResponseDto> {
    const room = await this.getRoom(roomCode);

    if (room.owner.id === user.id) {
      return {
        room,
        user,
      };
    }

    const existingParticipant = room.participants.filter(
      (participant) => participant.id === user.id,
    );

    if (existingParticipant.length) {
      return {
        room,
        user,
      };
    }

    room.participants.push(user);

    await this.roomRepositiry.save(room);

    const roomResponse = await this.getRoom(room.roomCode);
    return {
      room: roomResponse,
      user: user,
    };
  }

  async getRoom(roomCode: string) {
    const room = await this.roomRepositiry.findOne({
      where: { roomCode },
      relations: ['owner', 'stories', 'participants'],
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const roomResponse = new RoomResponseDto();
    roomResponse.id = room.id;
    roomResponse.description = room.description;
    roomResponse.roomCode = room.roomCode;
    roomResponse.title = room.title;
    roomResponse.owner = {
      id: room.owner.id,
      firstName: room.owner.firstName,
      email: room.owner.email,
    };
    roomResponse.participants =
      room.participants.map((participant) => {
        return {
          id: participant.id,
          email: participant.email,
          firstName: participant.firstName,
        };
      }) ?? [];
    roomResponse.stories =
      room.stories.map((story) => {
        return {
          id: story.id,
          title: story.title,
          selected: story.selected,
          status: story.status,
        };
      }) ?? [];

    return roomResponse;
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
}
