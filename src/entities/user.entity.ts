import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { InstaGuestUser } from './insta-guest-user.entity';
import { Trip } from './trip.entity';
import { UserCurationCollection } from './user-curation-collection.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 20 })
  telephoneNumber: string;

  @Column('varchar', { length: 60 })
  password: string;

  @Column('varchar', { length: 20 })
  nickname: string;

  @Column()
  birthDate: Date;

  @Column('char', { length: 1 })
  sex: string;

  @Column({ nullable: true })
  instaGuestUserId: string;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  @OneToMany(
    () => UserCurationCollection,
    (userCurationCollection) => userCurationCollection.user,
  )
  userCurationCollections: UserCurationCollection[];
}
