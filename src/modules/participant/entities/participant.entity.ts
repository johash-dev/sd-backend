import { Room } from 'src/modules/room/entities/room.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.participants, { onDelete: 'CASCADE' })
  room: Room;

  @ManyToOne(() => User, (user) => user.participations, { onDelete: 'CASCADE' })
  user: User;
}
