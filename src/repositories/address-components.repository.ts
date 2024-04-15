import { Injectable } from '@nestjs/common';
import { AddressComponents } from 'src/entities/address-components.entity';
import { Place } from 'src/entities/place.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AddressComponentsRepository extends Repository<AddressComponents> {
  private addressComponentsRepository: Repository<AddressComponents>;

  constructor(private readonly dataSource: DataSource) {
    super(AddressComponents, dataSource.createEntityManager());
  }

  async saveAddressComponents(
    addressComponents: any[],
    createdPlace: Place,
  ): Promise<AddressComponents> {
    const addressDetail = new AddressComponents();
    addressComponents = addressComponents || [];
    addressComponents.forEach((component) => {
      const type = component.types[0]; // 가장 첫 번째 타입을 기준으로 사용합니다.
      switch (type) {
        case 'postal_code':
          addressDetail.postalCode = component.longText;
          break;
        case 'country':
          addressDetail.country = component.longText;
          break;
        case 'administrative_area_level_1':
          addressDetail.administrativeAreaLevel1 = component.longText;
          break;
        case 'locality':
          addressDetail.locality = component.longText;
          break;
        case 'sublocality_level_1':
          addressDetail.sublocalityLevel1 = component.longText;
          break;
        case 'sublocality_level_2':
          addressDetail.sublocalityLevel2 = component.longText;
          break;
        case 'sublocality_level_3':
          addressDetail.sublocalityLevel3 = component.longText;
          break;
        case 'sublocality_level_4':
          addressDetail.sublocalityLevel4 = component.longText;
          break;
        case 'premise':
          addressDetail.premise = component.longText;
          break;
        case 'subpremise':
          addressDetail.subpremise = component.longText;
          break;
      }
    });
    addressDetail.place = createdPlace;

    return await this.save(addressDetail);
  }
}
