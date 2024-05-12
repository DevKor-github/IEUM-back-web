import { RawInstaCollection } from './../../common/interfaces/raw-insta-collection.interface';
import { ApiProperty } from '@nestjs/swagger';
import { InstaCollectionMarkerDto } from './insta-collection-marker.dto';
import { IsNotEmpty } from 'class-validator';
import { INSTA_COLLECTIONS_TAKE } from 'src/common/constants/pagination.constant';

//카테고리, 위도, 경도, 장소 이름, 장소 id(누르면 해당 장소 디테일 볼 수 있게) + 세부 장소 상위 3개까지, 태그, 인스타그램 html 태그, 인스타그램 콘텐츠
export class InstaCollectionDto {
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

  constructor(RawInstaCollection) {
    this.instaGuestCollectionId = RawInstaCollection.insta_guest_collection_id;
    this.placeId = RawInstaCollection.place_id;
    this.placeName = RawInstaCollection.place_name;
    this.latitude = parseFloat(RawInstaCollection.latitude);
    this.longitude = parseFloat(RawInstaCollection.longitude);
    this.category = RawInstaCollection.primary_category;
    this.instagramDescription = RawInstaCollection.instagram_description;
    this.embeddedTag = RawInstaCollection.embedded_tag;
    this.tags = RawInstaCollection.tags;
    this.address_level1 = RawInstaCollection.address_level1;
    this.address_level2 = RawInstaCollection.address_level2;
  }
}

export class InstaCollectionsListDto {
  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  nextCursorId: number;

  @ApiProperty({ type: [InstaCollectionDto] })
  data: InstaCollectionDto[];

  constructor(collectionsList: InstaCollectionDto[]) {
    const hasNextPage = collectionsList.length == INSTA_COLLECTIONS_TAKE + 1;
    const nextCursorId = hasNextPage
      ? collectionsList[INSTA_COLLECTIONS_TAKE - 1].instaGuestCollectionId
      : null;

    this.hasNextPage = hasNextPage;
    this.nextCursorId = nextCursorId;
    this.data = hasNextPage
      ? collectionsList.slice(0, INSTA_COLLECTIONS_TAKE)
      : collectionsList;
  }
}
