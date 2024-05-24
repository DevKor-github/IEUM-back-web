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
    { onDelete: 'CASCADE' },
  )
  collectionsFolder: CollectionsFolder;

  @RelationId(
    (collectionsFolderCuration: CollectionsFolderCuration) =>
      collectionsFolderCuration.collectionsFolder,
  )
  @Column()
  collectionsFolderId: number;

  @ManyToOne(() => UserCurationCollection, { onDelete: 'CASCADE' })
  userCurationCollection: UserCurationCollection;

  @RelationId(
    (collectionsFolderCuration: CollectionsFolderCuration) =>
      collectionsFolderCuration.userCurationCollection,
  )
  @Column()
  userCurationCollectionId: number;
}
