import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Discussion } from '../discussion/discussion.entity';

@Entity()
export class DiscussionLike {
  @PrimaryColumn()
  userIdx: number;

  @PrimaryColumn()
  discussionIdx: number;

  @ManyToOne(() => User, (user) => user.discussionLikes)
  user: User;

  @ManyToOne(() => Discussion, (discussion) => discussion.discussionLikes)
  discussion: Discussion;

  @CreateDateColumn()
  createdDate: Date;
}
