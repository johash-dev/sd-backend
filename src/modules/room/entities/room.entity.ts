import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  roomCode: string;

  @Column()
  ownerId: number;

  @Column()
  title: string;
}
