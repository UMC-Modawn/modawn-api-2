import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OpinionType } from './opinion.constant';
import { User } from '../user/user.entity';
import { Discussion } from '../discussion/discussion.entity';
import { OpinionLike } from '../opinion-like/opinion-like.entity';
import { OpinionReply } from '../opinion-reply/opinion-reply.entity';

@Entity()
export class Opinion {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('enum', { enum: OpinionType })
  type: OpinionType;

  @Column('varchar', { length: 100 })
  assert: string;

  @Column('varchar', { length: 100 })
  reason: string;

  @Column('text')
  content: string;

  @Column('varchar', { length: 255 })
  url: string;

  @Column('varchar', { length: 255 })
  imgUrl: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @ManyToOne(() => User, (user) => user.opinions)
  writer: User;

  @ManyToOne(() => Discussion, (discussion) => discussion.opinions)
  discussion: Discussion;

  @OneToMany(() => OpinionLike, (opinionLike) => opinionLike.opinion)
  opinionLikes: OpinionLike[];

  @OneToMany(() => OpinionReply, (opinionReply) => opinionReply.opinion)
  opinionReplies: OpinionReply[];
}
