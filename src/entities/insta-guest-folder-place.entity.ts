import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Place } from './place.entity';
import { InstaGuestFolder } from './insta-guest-folder.entity';

@Entity()
export class InstaGuestFolderPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => InstaGuestFolder,
    (instaGuestFolder) => instaGuestFolder.instaGuestFolderPlaces,
  )
  instaGuestFolder: InstaGuestFolder;

  @RelationId(
    (instaGuestFolderPlace: InstaGuestFolderPlace) =>
      instaGuestFolderPlace.instaGuestFolder,
  )
  @Column()
  instaGuestFolderId: number;

  @ManyToOne(() => Place, (place) => place.instaGuestFolderPlaces)
  place: Place;

  @RelationId(
    (instaGuestFolderPlace: InstaGuestFolderPlace) =>
      instaGuestFolderPlace.place,
  )
  @Column()
  placeId: number;
}
