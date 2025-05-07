import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AuthUser } from 'src/common/decorators';
import { User } from '../user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoomResponseDto } from './dto/room-response.dto';

@ApiBearerAuth('access-token')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(
    @AuthUser() user: User,
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<RoomResponseDto> {
    return this.roomService.createRoom(user, createRoomDto);
  }

  @Get('getAll')
  getAllRooms(@AuthUser() user: User) {
    return this.roomService.getRooms(user);
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
