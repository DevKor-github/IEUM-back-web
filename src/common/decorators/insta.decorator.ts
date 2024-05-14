import {
  ClassSerializerInterceptor,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CrawledInstagramDto } from 'src/instagram/dtos/crawled-instagram-dto';
import { InstaCollectionDetailDto } from 'src/instagram/dtos/insta-collection-detail.dto';
import { InstaCollectionMarkersListDto } from 'src/instagram/dtos/insta-collection-marker.dto';
import { InstaCollectionsListDto } from 'src/instagram/dtos/insta-collection.dto';

export function CrawlToDBDecorator() {
  return applyDecorators(
    UseInterceptors(ClassSerializerInterceptor),
    ApiConsumes('application/json'),
    ApiBody({ type: [CrawledInstagramDto] }),
    ApiOperation({
      summary: '인스타그램 게스트 정보 DB 적재',
      description:
        '1. insta-guest-user 생성 \n2. insta-guest-collection 생성 \n3. 구글 API이용 place 데이터 불러오기 및 저장.',
    }),
    ApiCreatedResponse({ description: '생성된 insta-guest-collection record' }),
  );
}

export function GetMarkersDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: '인스타그램 게스트 유저의 마커 정보 조회',
      description:
        '인스타그램 게스트 유저의 마커 정보를 조회합니다. 해당 유저의 마커 정보를 반환합니다.',
    }),
    ApiOkResponse({
      description: '마커 정보 반환',
      type: InstaCollectionMarkersListDto,
    }),
  );
}

export function GetCollectionsDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: '인스타그램 게스트 유저의 컬렉션 정보 조회',
      description:
        '인스타그램 게스트 유저의 컬렉션 정보를 조회합니다. 해당 유저의 컬렉션 정보를 반환합니다.',
    }),
    ApiOkResponse({
      description: '컬렉션 정보 반환',
      type: InstaCollectionsListDto,
    }),
  );
}

export function GetCollectionDetailDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: '인스타그램 게스트 유저의 컬렉션 상세 정보 조회',
      description:
        '인스타그램 게스트 유저의 컬렉션 상세 정보를 조회합니다. 해당 유저의 컬렉션 상세 정보를 반환합니다.',
    }),
    ApiOkResponse({
      description: '컬렉션 상세 정보 반환',
      type: InstaCollectionDetailDto,
    }),
  );
}
