import { Estimation } from 'src/modules/estimation/entities/estimation.entity';
import { Participant } from 'src/modules/participant/entities/participant.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Room, (room) => room.owner)
  rooms: Room[];

  @OneToMany(() => Participant, (participant) => participant.user)
  participations: Participant[];

  @OneToMany(() => Estimation, (estimation) => estimation.user)
  estimations: Estimation[];
}
