import { Story } from 'src/modules/story/entities/story.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estimation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Story, (story) => story.estimations)
  story: Story;

  @ManyToOne(() => User, (user) => user.estimations)
  user: User;

  @Column()
  optimistic: number;

  @Column()
  realistic: number;

  @Column()
  pessimistic: number;

  @Column()
  ready: boolean;
}
