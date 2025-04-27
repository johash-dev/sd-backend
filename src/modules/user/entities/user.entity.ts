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
}
