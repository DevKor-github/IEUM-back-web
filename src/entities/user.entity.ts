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

  @Column()
  nickname: string;

  @Column()
  birthDate: Date;

  @Column('char', { length: 1 })
  sex: string;

  @Column({ nullable: true })
  instaGuestUserId: number;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  @OneToMany(
    () => UserCurationCollection,
    (userCurationCollection) => userCurationCollection.user,
  )
  userCurationCollections: UserCurationCollection[];

  @OneToOne(() => Preference, (preference) => preference.user)
  preference: Preference;
}
