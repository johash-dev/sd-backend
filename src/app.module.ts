import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from './modules/room/room.module';
import { AuthModule } from './modules/auth/auth.module';

import { User, Room, Story } from './modules';
import { HashingService } from './util/hashing.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './util/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { StoryModule } from './modules/story/story.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'sd-db',
      entities: [User, Room, Story],
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    RoomModule,
    AuthModule,
    StoryModule,
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
