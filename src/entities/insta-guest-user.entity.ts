import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  Generated,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { InstaGuestCollection } from './insta-guest-collection.entity';

@Entity()
export class InstaGuestUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  instaId: string;

  @Column('uuid')
  @Generated('uuid')
  uuid: string;

  @OneToMany(
    () => InstaGuestCollection,
    (instaGuestCollection) => instaGuestCollection.instaGuestUser,
  )
  instaGuestCollections: InstaGuestCollection[];

  @OneToOne(() => User, (user) => user.instaGuestUser)
  user?: User;
}
