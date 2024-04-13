import { Controller, Post, Body } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CrawledInstagramDto } from './dto/crawled-instagram-dto';
import { InstaGuestCollection } from 'src/entities/insta-guest-collection.entity';
import { InstaGuestUser } from 'src/entities/insta-guest-user.entity';

@Controller('instagram')
@ApiTags('인스타그램 게스트 유저 서비스')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post()
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          instagramId: {
            type: 'string',
          },
          googlePlaceId: {
            type: 'string',
          },
          instagramLink: {
            type: 'string',
          },
          content: {
            type: 'string',
            description: 'optional',
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
    description: '생성된 insta-guest-user와 insta-guest-collection',
  })
  async crawlToDB(@Body() body: CrawledInstagramDto[]) {
    const createdInstaGuestUser: InstaGuestUser[] = [];
    const createdInstaGuestCollection: InstaGuestCollection[] = [];
    try {
      for (const crawledInstagramDto of body) {
        // placeService의 함수 호출 (CrawledInstagramDto.)
        // const placeInfo = await this.placeSerivce.~~ (CrawledInstagramDto.googlePlaceId)
        const instaGuestUser = await this.instagramService.createInstaGuestUser(
          {
            instaId: crawledInstagramDto.instagramId,
          },
        );
        const instaGuestCollection =
          await this.instagramService.createInstaGuestCollection({
            instaGuestUserId: instaGuestUser.id,
            placeId: 1, //placeInfo.id
            link: crawledInstagramDto.instagramLink,
            content: crawledInstagramDto.content,
          });
        createdInstaGuestUser.push(instaGuestUser);
        createdInstaGuestCollection.push(instaGuestCollection);
      }
      return {
        success: 'true',
        msg: 'instagram 정보가 성공적으로 DB에 적재되었습니다.',
        createdInstaGuestUser: createdInstaGuestUser,
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
