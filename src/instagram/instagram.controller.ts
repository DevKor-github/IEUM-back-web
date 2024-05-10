import {
  Controller,
  Post,
  Body,
  ParseArrayPipe,
  Get,
  Param,
} from '@nestjs/common';
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
    @Body(new ParseArrayPipe({ items: CrawledInstagramDto })) //for DTO array validation
    body: CrawledInstagramDto[],
  ) {
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

  @Get('markers/:instaId')
  async getMarkers(@Param('instaId') instaId: string) {
    return await this.instagramService.getMarkers(instaId);
  }

  // @Get('collections/:instaGuestId')
  // async getCollections() {
  //   return await this.instagramService.getCollections();
  // }

  // @Get('collections/:instaGuestId/:instaGuestCollectionId')
  // async getCollectionDetail() {
  //   return await this.instagramService.getCollectionDetail();
  // }
}
