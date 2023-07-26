import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DiscussionStatus } from './discussion.constant';
import { User } from '../user/user.entity';
import { DiscussionCategory } from '../discussion-category/discussion-category.entity';
import { DiscussionLike } from '../discussion-like/discussion-like.entity';
import { Opinion } from '../opinion/opinion.entity';

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('text')
  content: string;

  @Column('enum', { enum: DiscussionStatus })
  status: DiscussionStatus;

  @Column('varchar', { length: 255 })
  url: string;

  @Column('varchar', { length: 255 })
  imgUrl: string;

  @Column('datetime')
  startDate: Date;

  @Column('datetime')
  endDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @ManyToOne(() => User, (user) => user.discussions)
  writer: User;

  @ManyToOne(() => DiscussionCategory, (category) => category.discussions)
  discussionCategory: DiscussionCategory;

  @OneToMany(() => DiscussionLike, (discussionLike) => discussionLike.discussion)
  discussionLikes: DiscussionLike[];

  @OneToMany(() => Opinion, (opinion) => opinion.discussion)
  opinions: Opinion[];
}
