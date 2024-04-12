import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { InstaGuestUser } from './insta-guest-user.entity';
import { Place } from './place.entity';

@Entity()
export class InstaGuestCollection {
  @PrimaryGeneratedColumn()
  id: number;

  //InstaGuestUser에 Many To One
  @ManyToOne(
    () => InstaGuestUser,
    (instaGuestUser) => instaGuestUser.instaGuestCollections,
  )
  instaGuestUser: InstaGuestUser;

  @RelationId(
    (instaGuestCollection: InstaGuestCollection) =>
      instaGuestCollection.instaGuestUser,
  )
  @Column()
  instaGuestUserId: string;

  //Place에 Many To One
  @ManyToOne(() => Place, (place) => place.instaGuestCollections)
  place: Place;

  @RelationId(
    (instaGuestCollection: InstaGuestCollection) => instaGuestCollection.place,
  )
  @Column()
  placeId: number;

  @Column('varchar', { length: 200, nullable: true })
  content: string;

  @Column('varchar', { nullable: true })
  link: string;
}
