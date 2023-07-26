import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OpinionType } from '../opinion/opinion.constant';
import { User } from '../user/user.entity';
import { Opinion } from '../opinion/opinion.entity';

@Entity()
export class OpinionReply {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('text')
  content: string;

  @Column('enum', { enum: OpinionType })
  type: OpinionType;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @ManyToOne(() => User, (user) => user.opinionReplies)
  writer: User;

  @ManyToOne(() => Opinion, (opinion) => opinion.opinionReplies)
  opinion: Opinion;
}
