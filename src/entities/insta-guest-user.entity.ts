import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { InstaGuestCollection } from './insta-guest-collection.entity';

@Entity()
export class InstaGuestUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 30 })
  instaId: string;

  @OneToMany(
    () => InstaGuestCollection,
    (instaGuestCollection) => instaGuestCollection.instaGuestUser,
  )
  instaGuestCollections: InstaGuestCollection[];
}
