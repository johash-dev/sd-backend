import { Estimation } from 'src/modules/estimation/entities/estimation.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserStoryStatus {
  PENDING = 'pending',
  IN_ESTIMATION = 'in_estimation',
  ESTIMATED = 'estimated',
}

@Entity()
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Room, (room) => room.stories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Estimation, (estimation) => estimation.story)
  estimations: Estimation[];

  @Column({ type: 'enum', enum: UserStoryStatus, default: UserStoryStatus.PENDING })
  status: UserStoryStatus;
}
