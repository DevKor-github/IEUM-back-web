import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaceCategory } from './place-category.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  categoryName: string;

  @OneToMany(() => PlaceCategory, (placeCategory) => placeCategory.category)
  placeCategories: PlaceCategory[];
}
