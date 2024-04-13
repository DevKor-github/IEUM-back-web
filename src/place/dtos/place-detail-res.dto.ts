import { Place } from 'src/entities/place.entity';

export class PlaceDetailResDto {
  id: number;

  name: string;

  address: string;

  latitude: number; //위도

  longitude: number; //경도

  googlePlaceId: string; //googlePlaceId 필요

  openHours: string[];

  categories: string[];

  tags: string[];

  images: string[];

  //인스타 게스트 컬렉션
  //장소 스케쥴
  //큐레이션-장소
  constructor(place: any) {
    this.id = place.id;
    this.name = place.name;
    this.address = place.address;
    this.latitude = place.latitude;
    this.longitude = place.longitude;
    this.googlePlaceId = place.googlePlaceId;
    this.openHours = place.openHours?.opening;
    this.categories = place.placeCategories?.map(
      (placeCategory) => placeCategory.category.categoryName,
    );
    this.tags = place.placeTags?.map((placeTag) => placeTag.tag.tagName);
    this.images = place.placeImages?.map((placeImage) => placeImage.image.url);
  }
}
