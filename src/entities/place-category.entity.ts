import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Category } from './category.entity';
import { Place } from './place.entity';

@Entity()
export class PlaceCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Place, (place) => place.placeCategories)
  place: Place;

  @RelationId((placeCategory: PlaceCategory) => placeCategory.place)
  @Column()
  placeId: number;

  @ManyToOne(() => Category, (category) => category.placeCategories, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @RelationId((placeCategory: PlaceCategory) => placeCategory.category)
  @Column()
  categoryId: number;
}
