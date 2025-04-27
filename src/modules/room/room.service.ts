import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepositiry: Repository<Room>) {}

  create(user: User, createRoomDto: CreateRoomDto) {
    const room = new Room();
    room.title = createRoomDto.title;
    room.owner = user;

    return this.roomRepositiry.save(room);
  }

  async getRoom(roomCode: string) {
    const room = await this.roomRepositiry.findOne({
      where: { roomCode },
      relations: ['owner', 'stories'],
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
