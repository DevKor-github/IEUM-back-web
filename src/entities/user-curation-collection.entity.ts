import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Curation } from './curation.entity';
import { User } from './user.entity';
import { CurationPlace } from './curation-place.entity';

@Entity()
export class UserCurationCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCurationCollections)
  user: User;

  @RelationId(
    (userCurationCollection: UserCurationCollection) =>
      userCurationCollection.user,
  )
  @Column()
  userId: number;

  @ManyToOne(
    () => CurationPlace,
    (curationPlace) => curationPlace.userCurationCollections,
  )
  curationPlace: CurationPlace;

  @RelationId(
    (userCurationCollection: UserCurationCollection) =>
      userCurationCollection.curationPlace,
  )
  @Column()
  curationPlaceId: number;
}
