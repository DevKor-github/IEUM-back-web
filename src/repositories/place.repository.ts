import { Injectable } from '@nestjs/common';
import { Place } from 'src/entities/place.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PlaceRepository extends Repository<Place> {
  private placeRepository: Repository<Place>;

  constructor(private readonly dataSource: DataSource) {
    super(Place, dataSource.createEntityManager());
  }
}
