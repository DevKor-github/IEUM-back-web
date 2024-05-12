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
import { InstaCollectionMarkersListDto } from './dtos/insta-collection-marker.dto';
import { InstaCollectionsListDto } from './dtos/insta-collection.dto';
import { InstaCollectionDetailDto } from './dtos/insta-collection-detail.dto';

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

  @Get('markers/:instaId')
  async getMarkers(
    @Param('instaId') instaId: string,
  ): Promise<InstaCollectionMarkersListDto> {
    return await this.instagramService.getMarkers(instaId);
  }

  @Get('collections/:instaId')
  async getCollections(
    @Param('instaId') instaId: string,
  ): Promise<InstaCollectionsListDto> {
    return await this.instagramService.getCollections(instaId);
  }

  @Get('collections/:instaGuestId/:instaGuestCollectionId')
  async getCollectionDetail(
    @Param('instaId') instaId: string,
    @Param('instaGuestCollectionId') instaGuestCollectionId: number,
  ): Promise<InstaCollectionDetailDto> {
    return await this.instagramService.getCollectionDetail(
      instaId,
      instaGuestCollectionId,
    );
  }
}
