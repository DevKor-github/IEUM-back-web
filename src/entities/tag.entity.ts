import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaceTag } from './place-tag.entity';
import { FolderTag } from './folder-tag.entity';
import { CurationTag } from './curation-tag.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;

  @OneToMany(() => PlaceTag, (placeTag) => placeTag.tag)
  placeTags: PlaceTag[];

  @OneToMany(() => FolderTag, (folderTag) => folderTag.tag)
  folderTags: FolderTag[];

  @OneToMany(() => CurationTag, (curationTag) => curationTag.tag)
  curationTags: CurationTag[];
}
