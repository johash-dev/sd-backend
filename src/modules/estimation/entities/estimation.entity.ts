import { Story } from 'src/modules/story/entities/story.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['story', 'user'])
export class Estimation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Story, (story) => story.estimations)
  @JoinColumn({ name: 'storyId' })
  story: Story;

  @ManyToOne(() => User, (user) => user.estimations)
  @JoinColumn({ name: 'userId' })
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
