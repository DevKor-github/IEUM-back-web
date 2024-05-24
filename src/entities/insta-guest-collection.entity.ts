import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
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
    { onDelete: 'CASCADE' },
  )
  instaGuestUser: InstaGuestUser;

  //연결된 entity를 load할 필요없이 ID에 직접 액세스 할 수 있도록 해줌.
  @RelationId(
    (instaGuestCollection: InstaGuestCollection) =>
      instaGuestCollection.instaGuestUser,
  )
  @Column()
  instaGuestUserId: number;

  //Place에 Many To One
  @ManyToOne(() => Place, (place) => place.instaGuestCollections)
  place: Place;

  @RelationId(
    (instaGuestCollection: InstaGuestCollection) => instaGuestCollection.place,
  )
  @Column()
  placeId: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  embeddedTag: string;
}
