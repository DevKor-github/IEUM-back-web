import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  Column,
} from 'typeorm';
import { CollectionsFolder } from './collections-folder.entity';
import { UserCurationCollection } from './user-curation-collection.entity';

@Entity()
export class CollectionsFolderCuration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => CollectionsFolder,
    (collectionsFolder) => collectionsFolder.collectionsFolderCurations,
  )
  collectionsFolder: CollectionsFolder;

  @RelationId(
    (collectionsFolderCuration: CollectionsFolderCuration) =>
      collectionsFolderCuration.collectionsFolder,
  )
  @Column()
  collectionsFolderId: number;

  @ManyToOne(() => UserCurationCollection)
  userCurationCollection: UserCurationCollection;

  @RelationId(
    (collectionsFolderCuration: CollectionsFolderCuration) =>
      collectionsFolderCuration.userCurationCollection,
  )
  @Column()
  userCurationCollectionId: number;
}
