import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Place } from 'src/entities/place.entity';
import { CreatePlaceDto } from 'src/instagram/dto/create-place-dto';

@Injectable()
export class PlaceRepository extends Repository<Place> {
  constructor(dataSource: DataSource) {
    super(Place, dataSource.createEntityManager());
  }
  async createPlace(createPlaceDto: CreatePlaceDto): Promise<number> {
    const place = await this.findOne({
      where: { name: createPlaceDto.name, address: createPlaceDto.address },
    });

    //만약 이미 존재하는 장소면
    if (place) {
      return place.id;
    }

    const newPlace = new Place();
    newPlace.name = createPlaceDto.name;
    //주소가 있다면
    if (createPlaceDto.address) {
      newPlace.address = createPlaceDto.address;
    }
    //위경도가 있다면
    if (createPlaceDto.latitude && createPlaceDto.longitude) {
      newPlace.latitude = createPlaceDto.latitude;
      newPlace.longitude = createPlaceDto.longitude;
    }
    const savedPlace = await this.save(newPlace);

    return savedPlace.id;
  }
}
