import { FolderType } from 'src/common/enums/folder-type.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { InstaGuestUser } from './insta-guest-user.entity';
import { InstaGuestFolderPlace } from './insta-guest-folder-place.entity';

@Entity()
export class InstaGuestFolder {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => InstaGuestUser,
    (instaGuestUser) => instaGuestUser.instaGuestFolder,
  )
  @JoinColumn()
  instaGuestUser: InstaGuestUser;

  @OneToMany(
    () => InstaGuestFolderPlace,
    (instaGuestFolderPlace) => instaGuestFolderPlace.instaGuestFolder,
  )
  instaGuestFolderPlaces: InstaGuestFolderPlace[];
}
