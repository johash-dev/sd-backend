import { Estimation } from 'src/modules/estimation/entities/estimation.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserStoryStatus {
  PENDING = 'pending',
  IN_ESTIMATION = 'in_estimation',
  ESTIMATED = 'estimated',
}

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.stories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column()
  title: string;

  @OneToMany(() => Estimation, (estimation) => estimation.story)
  estimations: Estimation[];

  @Column({ type: 'enum', enum: UserStoryStatus, default: UserStoryStatus.PENDING })
  status: UserStoryStatus;
}
