import { Estimation } from 'src/modules/estimation/entities/estimation.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Room, (room) => room.owner)
  rooms: Room[];

  @ManyToMany(() => Room, (room) => room.participants)
  participations: Room[];

  @OneToMany(() => Estimation, (estimation) => estimation.user)
  estimations: Estimation[];
}
