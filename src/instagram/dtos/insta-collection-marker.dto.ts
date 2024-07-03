import { RawInstaPlaceMarker } from 'src/common/interfaces/raw-insta-collection.interface';
//카테고리, 위도, 경도, 장소 이름, 장소 id(누르면 해당 장소 디테일 볼 수 있게). 마커는 총 갯수

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InstaCollectionMarkerDto {
  @ApiProperty()
  @IsNotEmpty()
  placeId: number;

  @ApiProperty()
  @IsNotEmpty()
  placeName: string;

  @ApiProperty()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  representativeCategory: string;

  constructor(
    rawInstaPlaceMarker: RawInstaPlaceMarker,
    representativeCategory: string,
  ) {
    this.placeId = rawInstaPlaceMarker.place_id;
    this.placeName = rawInstaPlaceMarker.place_name;
    this.latitude = parseFloat(rawInstaPlaceMarker.latitude);
    this.longitude = parseFloat(rawInstaPlaceMarker.longitude);
    this.category = rawInstaPlaceMarker.primary_category;
    this.representativeCategory = representativeCategory;
  }
}

export class InstaCollectionMarkersListDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [InstaCollectionMarkerDto] })
  data: InstaCollectionMarkerDto[];

  constructor(total: number, markers: InstaCollectionMarkerDto[]) {
    this.total = total;
    this.data = markers;
  }
}
