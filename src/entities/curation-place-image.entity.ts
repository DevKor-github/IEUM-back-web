import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Image } from './image.entity';
import { CurationPlace } from './curation-place.entity';

@Entity()
export class CurationPlaceImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => CurationPlace,
    (curationPlace) => curationPlace.curationPlaceImages,
  )
  curationPlace: CurationPlace;

  @RelationId(
    (curationPlaceImage: CurationPlaceImage) =>
      curationPlaceImage.curationPlace,
  )
  @Column()
  curationPlaceId: number;

  @ManyToOne(() => Image, (image) => image.curationPlaceImages)
  image: Image;

  @RelationId(
    (curationPlaceImage: CurationPlaceImage) => curationPlaceImage.image,
  )
  imageId: number;
}
