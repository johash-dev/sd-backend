import { Story } from 'src/modules/story/entities/story.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estimation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Story, (story) => story.estimations)
  story: Story;

  @ManyToOne(() => User, (user) => user.estimations)
  user: User;

  @Column({ nullable: true })
  optimistic?: number;

  @Column({ nullable: true })
  realistic?: number;

  @Column({ nullable: true })
  pessimistic?: number;

  @Column()
  ready: boolean;
}
