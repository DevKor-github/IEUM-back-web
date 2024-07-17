import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  Generated,
  Index,
} from 'typeorm';
import { InstaGuestCollection } from './insta-guest-collection.entity';
import { InstaGuestFolder } from './insta-guest-folder.entity';

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

  @OneToOne(
    () => InstaGuestFolder,
    (instaGuestFolder) => instaGuestFolder.instaGuestUser,
  )
  instaGuestFolder: InstaGuestFolder;
}
