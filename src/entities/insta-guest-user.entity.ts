import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  Generated,
} from 'typeorm';
import { User } from './user.entity';
import { InstaGuestCollection } from './insta-guest-collection.entity';

@Entity()
export class InstaGuestUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  instaId: string;

  @Column('uuid')
  @Generated('uuid')
  uuid: string;

  @OneToMany(
    () => InstaGuestCollection,
    (instaGuestCollection) => instaGuestCollection.instaGuestUser,
  )
  instaGuestCollections: InstaGuestCollection[];
}
