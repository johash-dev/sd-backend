import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: string;

  @Generated('uuid')
  roomCode: string;

  @Column()
  ownerId: string;

  @Column()
  title: string;
}
