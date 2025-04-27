import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepositiry: Repository<Room>) {}

  create(createRoomDto: CreateRoomDto) {
    const room = new Room();
    room.ownerId = createRoomDto.ownerId;
    room.title = createRoomDto.title;

    return this.roomRepositiry.save(room);
  }
}
