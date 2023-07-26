import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Discussion } from '../discussion/discussion.entity';
import { DiscussionLike } from '../discussion-like/discussion-like.entity';
import { Opinion } from '../opinion/opinion.entity';
import { OpinionLike } from '../opinion-like/opinion-like.entity';
import { OpinionReply } from '../opinion-reply/opinion-reply.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { length: 50, unique: true })
  email: string;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('varchar', { length: 50, unique: true })
  nickname: string;

  @Column('varchar', { length: 64 })
  encryptedPassword: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @OneToMany(() => Discussion, (discussion) => discussion.writer)
  discussions: Discussion[];

  @OneToMany(() => DiscussionLike, (discussionLike) => discussionLike.user)
  discussionLikes: DiscussionLike[];

  @OneToMany(() => Opinion, (opinion) => opinion.writer)
  opinions: Opinion[];

  @OneToMany(() => OpinionLike, (opinionLike) => opinionLike.user)
  opinionLikes: OpinionLike[];

  @OneToMany(() => OpinionReply, (opinionReply) => opinionReply.writer)
  opinionReplies: OpinionReply[];
}
