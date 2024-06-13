import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { Curation } from './curation.entity';

@Entity()
export class UserCurationLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCurationLikes)
  user: User;

  @RelationId((userCurationLike: UserCurationLike) => userCurationLike.user)
  @Column()
  userId: number;

  @ManyToOne(() => Curation, (curation) => curation.userCurationLikes)
  curation: Curation;

  @RelationId((userCurationLike: UserCurationLike) => userCurationLike.curation)
  @Column()
  curationId: number;

  @CreateDateColumn()
  likedAt: Date;
}
