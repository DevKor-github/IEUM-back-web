import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  PLACES_API_BASE_URL,
  SEARCH_BY_ID_URL,
  SEARCH_BY_TEXT_URL,
} from 'src/common/constants/google-apis.constant';
import { Place } from 'src/entities/place.entity';
import { CategoryRepository } from 'src/repositories/category.repository';
import { OpenHoursRepository } from 'src/repositories/open-hours.repository';
import { PlaceCategoryRepository } from 'src/repositories/place-category.repository';
import { PlaceRepository } from 'src/repositories/place.repository';

@Injectable()
export class PlaceService {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly openHoursRepository: OpenHoursRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly placeCategoryRepository: PlaceCategoryRepository,
  ) {}

  async searchPlaceByText(text: string) {
    const place = await axios.post(
      SEARCH_BY_TEXT_URL,
      { textQuery: text, languageCode: 'ko' },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress,places.priceLevel',
        },
      },
    );
    return this.getPlaceDetailById(place.data.places[0].id);
  }

  async getPlaceDetailById(id: string) {
    const placeDetail = await axios.get(SEARCH_BY_ID_URL + id, {
      params: { languageCode: 'ko' },
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask':
          'id,name,types,displayName,nationalPhoneNumber,formattedAddress,location,regularOpeningHours.weekdayDescriptions,displayName,primaryTypeDisplayName',
      }, // photos
    });
    console.log(placeDetail.data);
    return {
      장소명: placeDetail.data.displayName.text,
      주소: placeDetail.data.formattedAddress,
      위도: placeDetail.data.location.latitude,
      경도: placeDetail.data.location.longitude,
      전화번호: placeDetail.data.nationalPhoneNumber,
      영업시간: placeDetail.data.regularOpeningHours.weekdayDescriptions,
      카테고리: placeDetail.data.primaryTypeDisplayName.text,
      '기타 태그': placeDetail.data.types,
    };
  }

  async createPlaceById(placeId: string): Promise<Place> {
    const existedPlace = await this.placeRepository.findOne({
      where: { googlePlaceId: placeId },
    });
    if (existedPlace) return existedPlace;

    const placeDetail = await axios.get(SEARCH_BY_ID_URL + placeId, {
      params: { languageCode: 'ko' },
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask':
          'id,name,types,displayName,nationalPhoneNumber,formattedAddress,location,regularOpeningHours.weekdayDescriptions,displayName,primaryTypeDisplayName',
      }, // photos
    });

    const createdPlace = await this.placeRepository.save({
      name: placeDetail.data.displayName.text,
      address: placeDetail.data.formattedAddress,
      latitude: placeDetail.data.location.latitude,
      longitude: placeDetail.data.location.longitude,
      googlePlaceId: placeDetail.data.id,
    });

    const OpeningHours = await this.openHoursRepository.save({
      opening: placeDetail.data.regularOpeningHours.weekdayDescriptions,
      place: createdPlace,
    });

    let existedCategory = await this.categoryRepository.findOne({
      where: {
        categoryName: placeDetail.data.primaryTypeDisplayName.text,
      },
    });
    if (!existedCategory) {
      existedCategory = await this.categoryRepository.save({
        categoryName: placeDetail.data.primaryTypeDisplayName.text,
      });
    }

    await this.placeCategoryRepository.save({
      place: createdPlace,
      category: existedCategory,
    });

    return createdPlace;

    // async getPlacePhoto(photoResource: string) {
    //   console.log(PLACES_API_BASE_URL + photoResource + '/media');
    //   const photo = await axios.get(
    //     PLACES_API_BASE_URL + photoResource + '/media',
    //     {
    //       params: {
    //         key: process.env.GOOGLE_API_KEY,
    //         maxHeightPx: 1000,
    //         maxWidthPx: 1000,
    //         skipHttpRedirect: true,
    //       },
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
    //       },
    //     },
    //   );
    //   return { photoUri: photo.data.photoUri };
    // }
  }

  /*
POST로 인스타 게스트 서비스에 CrawledInstagramDto[]를 전달

인스타 게스트 서비스는 CrawledInstagramDto[]를 받아서, map을 통해 처리

map((crawledInstagramDto) => 
const place = await this.placeService.createPlace(placeId)

인스타그램 게스트 유저 검색 로직
  -> 없으면 유저 새로 만들기
  -> 아무튼 인스타그램 게스트 유저 uuid 리턴

게스트 유저 uuid와 인스타그램 링크, 설명, placeId를 이용해 instaGuestCollection 생성
*/

  /*
  placeId가 전달되면

  먼저 해당 placeId로 place가 이미 존재하는지 체크 -> 있으면 그걸 바로 리턴

  없으면 만들어야함
  placeId로 구글 플레이스 세부 정보 리턴

  const createdPlace = await this.placeRepository.save({
    name : placeDetail.data.displayName.text
    address : placeDetail.data.formattedAddress
    latitude : placeDetail.data.location.latitude
    longitude : placeDetail.data.location.longitude
    googlePlaceId : placeDetail.data.id -> 추가할 사항
  });

  이후 
  const OpeningHours = await this.openHoursRepository.save({
    opening : placeDetail.data.regularOpeningHours.weekdayDescriptions
    place : createdPlace
  })

  let existedCategory = await this.placeCategoryRepository.findOne({categoryName : placeDetail.data.primaryTypeDisplayName.text})
  if(!existedCategory) {  existedCategory = await this.placeCategoryRepository.save({categoryName : placeDetail.data.primaryTypeDisplayName.text})
  await this.placeCategoryRepository.save({
    place : createdPlace,
    category : existedCategory
  })
*/
}
