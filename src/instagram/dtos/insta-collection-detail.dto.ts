//카테고리, 위도, 경도, 장소 이름, 장소 id(누르면 해당 장소 디테일 볼 수 있게)
//+ 세부 장소 상위 3개까지, 태그, 인스타그램 html 태그, 인스타그램 콘텐츠
//+ 인스타그램 링크, 상세주소, 영업시간, 전화번호

import { ApiProperty } from '@nestjs/swagger';
import { InstaCollectionDto } from './insta-collection.dto';
import { IsNotEmpty } from 'class-validator';
import { RawInstaCollectionDetail } from 'src/common/interfaces/raw-insta-collection.interface';

export class InstaCollectionDetailDto {
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
  @IsNotEmpty()
  instagramDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  embeddedTag: string;

  @ApiProperty()
  @IsNotEmpty()
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  address_level1: string;

  @ApiProperty()
  @IsNotEmpty()
  address_level2: string;

  @ApiProperty()
  @IsNotEmpty()
  link: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  openHours: string[];

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  constructor(rawInstaCollectionDetail: RawInstaCollectionDetail) {
    this.instaGuestCollectionId =
      rawInstaCollectionDetail.insta_guest_collection_id;
    this.placeId = rawInstaCollectionDetail.place_id;
    this.placeName = rawInstaCollectionDetail.place_name;
    this.latitude = parseFloat(rawInstaCollectionDetail.latitude);
    this.longitude = parseFloat(rawInstaCollectionDetail.longitude);
    this.category = rawInstaCollectionDetail.primary_category;
    this.instagramDescription = rawInstaCollectionDetail.instagram_description;
    this.embeddedTag = rawInstaCollectionDetail.embedded_tag;
    this.tags = rawInstaCollectionDetail.tags;
    this.address_level1 = rawInstaCollectionDetail.address_level1;
    this.address_level2 = rawInstaCollectionDetail.address_level2;
    this.link = rawInstaCollectionDetail.link;
    this.address = rawInstaCollectionDetail.address;
    this.openHours = rawInstaCollectionDetail.open_hours;
    this.phoneNumber = rawInstaCollectionDetail.phone_number;
  }
}
