import { Estimation } from 'src/modules/estimation/entities/estimation.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserStoryStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  REVEALED = 'REVEALED',
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

  @Column({ default: false })
  @Index()
  selected: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Estimation, (estimation) => estimation.story)
  estimations: Estimation[];

  @Column({ type: 'enum', enum: UserStoryStatus, default: UserStoryStatus.PENDING })
  status: UserStoryStatus;
}
