import { Controller, Post, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }
}
