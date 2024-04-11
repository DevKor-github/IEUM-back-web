import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Curation } from './curation.entity';
import { Place } from './place.entity';
import { UserCurationCollection } from './user-curation-collection.entity';
import { CurationPlaceImage } from './curation-place-image.entity';

@Entity()
export class CurationPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Curation, (curation) => curation.curationPlaces)
  curation: Curation;

  @RelationId((curationPlace: CurationPlace) => curationPlace.curation)
  @Column()
  curationId: number;

  @ManyToOne(() => Place, (place) => place.curationPlaces)
  place: Place;

  @RelationId((curationPlace: CurationPlace) => curationPlace.place)
  @Column()
  placeId: number;

  //유저가 저장한 큐레이션-장소
  @OneToMany(
    () => UserCurationCollection,
    (userCurationCollection) => userCurationCollection.curationPlace,
  )
  userCurationCollections: UserCurationCollection[];

  @OneToMany(
    () => CurationPlaceImage,
    (curationPlaceImage) => curationPlaceImage.curationPlace,
  )
  curationPlaceImages: CurationPlaceImage[];
}
