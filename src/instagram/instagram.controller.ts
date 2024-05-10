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
import { CrawlToDBDecorator } from 'src/common/decorators/crawl-to-db.decorator';

@Controller('instagram')
@ApiTags('인스타그램 게스트 유저 서비스')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @CrawlToDBDecorator()
  @Post()
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
