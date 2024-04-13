import { Controller, Post, Body, ParseArrayPipe } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { CrawledInstagramDto } from './dto/crawled-instagram-dto';

@Controller('instagram')
@ApiTags('인스타그램 게스트 유저 서비스')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post()
  @ApiConsumes('application/json')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'validation error' })
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          googlePlaceId: {
            type: 'string',
          },
          instagramDescription: {
            type: 'string',
            description: 'optional',
          },
          instagramId: {
            type: 'string',
          },
          instagramLink: {
            type: 'string',
          },
        },
      },
    },
  })
  @ApiOperation({
    summary: '인스타그램 게스트 정보 DB 적재',
    description:
      '1. insta-guest-user 생성 \n2. insta-guest-collection 생성 \n3. 구글 API이용 place 데이터 불러오기 및 저장.',
  })
  @ApiCreatedResponse({
    description: '생성된 insta-guest-collection record',
  })
  async crawlToDB(
    //dto 유효성 검사 array에 필수.: ParseArrayPipe
    @Body(new ParseArrayPipe({ items: CrawledInstagramDto }))
    body: CrawledInstagramDto[],
  ) {
    try {
      const createdInstaGuestCollection =
        await this.instagramService.crawlToDB(body);
      return {
        success: 'true',
        msg: 'instagram 정보와 place 정보가 성공적으로 DB에 적재되었습니다.',
        createdInstaGuestCollection: createdInstaGuestCollection,
      };
    } catch (error) {
      return {
        success: 'false',
        msg: '오류가 발생하여 DB에 적재하지 못했습니다.',
        error: error.message,
      };
    }
  }
}
