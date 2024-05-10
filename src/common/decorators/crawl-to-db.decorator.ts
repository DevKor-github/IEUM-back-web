import {
  ClassSerializerInterceptor,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CrawledInstagramDto } from 'src/instagram/dtos/crawled-instagram-dto';

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
