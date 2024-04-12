import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaceImage } from './place-image.entity';
import { CurationPlaceImage } from './curation-place-image.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @OneToMany(() => PlaceImage, (placeImage) => placeImage.image)
  placeImages: PlaceImage[];

  @OneToMany(
    () => CurationPlaceImage,
    (curationPlaceImage) => curationPlaceImage.image,
  )
  curationPlaceImages: CurationPlaceImage[];
}
