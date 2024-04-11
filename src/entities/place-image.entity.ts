import { Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Place } from './place.entity';
import { Image } from './image.entity';

@Entity()
export class PlaceImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Place, (place) => place.placeImages)
  place: Place;

  @RelationId((placeImage: PlaceImage) => placeImage.place)
  placeId: number;

  @ManyToOne(() => Image, (image) => image.placeImages)
  image: Image;

  @RelationId((placeImage: PlaceImage) => placeImage.image)
  imageId: number;
}
