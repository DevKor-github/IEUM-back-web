import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InstaGuestUserRepository } from '../repositories/insta-guest-user.repository';
import { InstaGuestCollectionRepository } from 'src/repositories/insta-guest-collection.repository';
import { InstaGuestCollection } from 'src/entities/insta-guest-collection.entity';
import { CrawledInstagramDto } from './dtos/crawled-instagram-dto';
import { PlaceService } from 'src/place/place.service';
import { INSTA_COLLECTIONS_TAKE } from 'src/common/constants/pagination.constant';
import {
  InstaCollectionMarkerDto,
  InstaCollectionMarkersListDto,
} from './dtos/insta-collection-marker.dto';
import { CATEGORY_MAPPING } from 'src/common/constants/category-mapping.constant';
import {
  InstaCollectionDto,
  InstaCollectionsListDto,
} from './dtos/insta-collection.dto';
import { InstaCollectionDetailDto } from './dtos/insta-collection-detail.dto';

@Injectable()
export class InstagramService {
  constructor(
    private readonly placeService: PlaceService,
    private readonly instaGuestUserRepository: InstaGuestUserRepository,
    private readonly instaGuestCollectionRepository: InstaGuestCollectionRepository,
  ) {}

  async crawlToDB(
    crawledInstagramDto: CrawledInstagramDto[],
  ): Promise<InstaGuestCollection[]> {
    const createdInstaGuestCollection = [];

    for (const dto of crawledInstagramDto) {
      try {
        const placeInfo = await this.placeService.createPlaceByGooglePlaceId(
          dto.googlePlaceId,
        );
        const instaGuestUser =
          await this.instaGuestUserRepository.createInstaGuestUser({
            instaId: dto.instagramId,
          });
        const instaGuestCollection =
          await this.instaGuestCollectionRepository.createInstaGuestCollection({
            instaGuestUserId: instaGuestUser.id,
            placeId: placeInfo.id,
            link: dto.instagramLink,
            content: dto.instagramDescription,
            embeddedTag: dto.embeddedTag,
          });
        if (instaGuestCollection) {
          //null값이 아니다 -> 새롭게 저장됐다.
          createdInstaGuestCollection.push(instaGuestCollection);
        }
      } catch (error) {
        //에러를 호출자에게 전파 및 for loop 중단.
        throw new InternalServerErrorException(
          'crawled 데이터를 DB에 적재하는 과정에서 오류가 발생했습니다.',
          error.stack,
        );
      }
    }

    return createdInstaGuestCollection;
  }

  htmlTest(htmlBody: string): string {
    return htmlBody;
  }

  async getMarkers(instaId: string): Promise<InstaCollectionMarkersListDto> {
    const instaGuestUser = await this.instaGuestUserRepository.findOne({
      where: { instaId: instaId },
    });
    const rawMarkers = await this.instaGuestCollectionRepository.getMarkers(
      instaGuestUser.id,
    );
    const markersList = rawMarkers.map((rawMarker) => {
      return new InstaCollectionMarkerDto(
        rawMarker,
        this.determineRepresentativeCategory(rawMarker.primary_category),
      );
    });

    return new InstaCollectionMarkersListDto(markersList.length, markersList);
  }

  async getCollections(instaId: string, region?: string, cursorId?: number) {
    const instaGuestUser = await this.instaGuestUserRepository.findOne({
      where: { instaId: instaId },
    });
    const rawInstaCollections =
      await this.instaGuestCollectionRepository.getCollections(
        instaGuestUser.id,
        region,
        cursorId,
      );
    const collectionsList = rawInstaCollections.map((rawCollection) => {
      return new InstaCollectionDto(rawCollection);
    });
    return new InstaCollectionsListDto(collectionsList);
  }

  async getCollectionDetail(
    instaId: string,
    instaGuestCollectionId: number,
  ): Promise<InstaCollectionDetailDto> {
    const instaGuestUser = await this.instaGuestUserRepository.findOne({
      where: { instaId: instaId },
    });
    const rawDetail =
      await this.instaGuestCollectionRepository.getCollectionDetail(
        instaGuestUser.id,
        instaGuestCollectionId,
      );
    return new InstaCollectionDetailDto(rawDetail);
  }

  determineRepresentativeCategory(category: string): string {
    for (const [newCategory, oldCategories] of Object.entries(
      CATEGORY_MAPPING,
    )) {
      if (oldCategories.includes(category)) {
        return newCategory;
      }
    }
    return 'Others';
  }
}
