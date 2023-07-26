import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Opinion } from '../opinion/opinion.entity';

@Entity()
export class OpinionLike {
  @PrimaryColumn()
  userIdx: number;

  @PrimaryColumn()
  opinionIdx: number;

  @ManyToOne(() => User, (user) => user.opinionLikes)
  user: User;

  @ManyToOne(() => Opinion, (opinion) => opinion.opinionLikes)
  opinion: Opinion;

  @CreateDateColumn()
  createdDate: Date;
}
