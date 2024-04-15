import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaceTag } from './place-tag.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;

  @OneToMany(() => PlaceTag, (placeTag) => placeTag.tag)
  placeTags: PlaceTag[];
}
