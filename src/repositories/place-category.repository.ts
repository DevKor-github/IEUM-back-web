import { Injectable } from '@nestjs/common';
import { PlaceCategory } from 'src/entities/place-category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PlaceCategoryRepository extends Repository<PlaceCategory> {
  private placeCategoryRepository: Repository<PlaceCategory>;

  constructor(private readonly dataSource: DataSource) {
    super(PlaceCategory, dataSource.createEntityManager());
  }
}
