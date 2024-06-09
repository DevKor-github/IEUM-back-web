import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { FolderType } from 'src/common/enums/folder-type.enum';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.folders)
  user: User;

  @RelationId((Folder: Folder) => Folder.user)
  @Column()
  userId: number;

  @Column({ type: 'enum', enum: FolderType, default: FolderType.Custom })
  type: number;
}
