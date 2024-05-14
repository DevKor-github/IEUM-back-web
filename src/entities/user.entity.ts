import {
  Column,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { InstaGuestUser } from './insta-guest-user.entity';
import { Trip } from './trip.entity';
import { UserCurationCollection } from './user-curation-collection.entity';
import { Preference } from './preference.entity';
import { CollectionsFolder } from './collections-folder.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  @Generated('uuid')
  uuid: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column('char', { length: 1, nullable: true })
  sex: string;

  @Column('varchar', { length: 4, nullable: true })
  mbti: string;

  @Column({ nullable: true })
  instaGuestUserId: number;

  @Column('varchar', { nullable: true })
  refreshToken: string;

  @Column('boolean', { default: true })
  initialLogin: boolean;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  @OneToMany(
    () => UserCurationCollection,
    (userCurationCollection) => userCurationCollection.user,
  )
  userCurationCollections: UserCurationCollection[];

  @OneToOne(() => Preference, (preference) => preference.user)
  preference: Preference;

  @OneToMany(
    () => CollectionsFolder,
    (collectionsFolder) => collectionsFolder.user,
  )
  collectionsFolders: CollectionsFolder[];
}
