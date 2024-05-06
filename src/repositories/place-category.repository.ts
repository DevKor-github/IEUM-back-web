import { Injectable } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { PlaceCategory } from 'src/entities/place-category.entity';
import { Place } from 'src/entities/place.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PlaceCategoryRepository extends Repository<PlaceCategory> {
  private placeCategoryRepository: Repository<PlaceCategory>;

  constructor(private readonly dataSource: DataSource) {
    super(PlaceCategory, dataSource.createEntityManager());
  }

  async savePlaceCategoryArray(
    createdPlace: Place,
    categories: Category[],
  ): Promise<PlaceCategory[]> {
    const placeCategories: PlaceCategory[] = [];
    categories.map(async (category) => {
      placeCategories.push(
        await this.save({
          place: createdPlace,
          category: category,
        }),
      );
    });
    return placeCategories;
  }
}
