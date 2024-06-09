import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Curation } from './curation.entity';
import { Tag } from './tag.entity';

@Entity()
export class CurationTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Curation, (curation) => curation.curationTags)
  curation: Curation;

  @RelationId((curationTag: CurationTag) => curationTag.curation)
  @Column()
  curationId: number;

  @ManyToOne(() => Tag, (tag) => tag.curationTags)
  tag: Tag;

  @RelationId((curationTag: CurationTag) => curationTag.tag)
  @Column()
  tagId: number;
}
