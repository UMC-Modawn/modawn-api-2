import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Discussion } from '../discussion/discussion.entity';

@Entity()
export class DiscussionCategory {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { length: 20 })
  type: string;

  @OneToMany(() => Discussion, (discussion) => discussion.discussionCategory)
  discussions: Discussion[];
}
