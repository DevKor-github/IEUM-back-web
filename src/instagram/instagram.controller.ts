import { Controller, Post, Body, ParseArrayPipe } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CrawledInstagramDto } from './dtos/crawled-instagram-dto';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

@Controller('instagram')
@ApiTags('인스타그램 게스트 유저 서비스')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiConsumes('application/json')
  //dto에서 @Apiproperty 를 사용하면 훨씬 깔끔하게 짤 수 있다.
  @ApiBody({
    type: [CrawledInstagramDto],
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
    //nest에 built-in global exception handler가 존재하기 때문에, service단에서 error가 발생하면, controller
    //에서는 따로 try catch 하지 않아도 HttpException을 자동으로 받아서 처리해줌.
    return await this.instagramService.crawlToDB(body);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        html: {
          type: 'string',
        },
      },
    },
  })
  @Post('html-test')
  async htmlTest(@Body('html') htmlBody: string) {
    return await this.instagramService.htmlTest(htmlBody);
  }
}
