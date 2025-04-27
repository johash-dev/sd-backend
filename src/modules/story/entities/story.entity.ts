import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  title: string;
}
