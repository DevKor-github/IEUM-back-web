//카테고리, 위도, 경도, 장소 이름, 장소 id(누르면 해당 장소 디테일 볼 수 있게). 마커는 총 갯수

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InstaCollectionMarkerDto {
  @ApiProperty()
  @IsNotEmpty()
  instaGuestCollectionId: number;

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
    instaGuestCollectionId: number,
    placeId: number,
    placeName: string,
    latitude: number,
    longitude: number,
    category: string,
    representativeCategory: string,
  ) {
    this.instaGuestCollectionId = instaGuestCollectionId;
    this.placeId = placeId;
    this.placeName = placeName;
    this.latitude = latitude;
    this.longitude = longitude;
    this.category = category;
    this.representativeCategory = representativeCategory;
  }
}

export class InstaCollectionMarkersListDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [InstaCollectionMarkerDto] })
  markers: InstaCollectionMarkerDto[];

  constructor(total: number, markers: InstaCollectionMarkerDto[]) {
    this.total = total;
    this.markers = markers;
  }
}
