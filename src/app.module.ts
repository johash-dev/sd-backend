import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from './modules/room/room.module';
import { AuthModule } from './modules/auth/auth.module';

import { User, Room, Story, Estimation } from './modules';
import { HashingService } from './util/hashing.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './util/constants';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthGuard } from './common/guards/auth.guard';
import { StoryModule } from './modules/story/story.module';
import { UserModule } from './modules/user/user.module';
import { EstimationModule } from './modules/estimation/estimation.module';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'sd-db',
      entities: [User, Room, Story, Estimation],
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    RoomModule,
    AuthModule,
    StoryModule,
    UserModule,
    EstimationModule,
    EventEmitterModule.forRoot(),
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HashingService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
