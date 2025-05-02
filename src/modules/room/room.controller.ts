import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AuthUser } from 'src/common/decorators';
import { User } from '../user/entities/user.entity';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(user: User, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(user, createRoomDto);
  }

  @Get(':roomCode')
  getRoom(@Param('roomCode') roomCode: string) {
    return this.roomService.getRoom(roomCode);
  }

  @Post('join/:roomCode')
  joinRoom(@AuthUser() user: User, @Param('roomCode') roomCode: string) {
    return this.roomService.joinRoom(user, roomCode);
  }
}
