import { Story } from 'src/modules/story/entities/story.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  roomCode: string;

  @ManyToOne(() => User, (user) => user.rooms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  title: string;

  @OneToMany(() => Story, (story) => story.room)
  stories: Story[];
}
