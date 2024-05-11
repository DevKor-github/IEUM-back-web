import { Column, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { User } from './user.entity';

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
}
