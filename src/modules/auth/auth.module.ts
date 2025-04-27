import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashingService } from 'src/util/hashing.service';
import { UserService } from './user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashingService, UserService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UserService],
})
export class AuthModule {}
