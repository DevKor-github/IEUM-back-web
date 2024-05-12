import {
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { CollectionsFolderCuration } from './collections-folder-curation';
import { CollectionsFolderInstagram } from './collections-folder-instagram';

export class CollectionsFolder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.collectionsFolders)
  user: User;

  @RelationId((collectionsFolder: CollectionsFolder) => collectionsFolder.user)
  @Column()
  userId: number;

  @OneToMany(
    () => CollectionsFolderCuration,
    (collectionsFolderCuration) => collectionsFolderCuration.collectionsFolder,
  )
  collectionsFolderCurations: CollectionsFolderCuration[];

  @OneToMany(
    () => CollectionsFolderInstagram,
    (collectionsFolderInstagram) =>
      collectionsFolderInstagram.collectionsFolder,
  )
  collectionsFolderInstagrams: CollectionsFolderInstagram[];
}
