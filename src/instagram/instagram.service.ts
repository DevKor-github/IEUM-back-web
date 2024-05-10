import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InstaGuestUserRepository } from '../repositories/insta-guest-user.repository';
import { InstaGuestCollectionRepository } from 'src/repositories/insta-guest-collection.repository';
import { InstaGuestCollection } from 'src/entities/insta-guest-collection.entity';
import { CrawledInstagramDto } from './dtos/crawled-instagram-dto';
import { PlaceService } from 'src/place/place.service';

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

  async getMarkers(instaId: string) {
    const instaGuestUser = await this.instaGuestUserRepository.findOne({
      where: { instaId: instaId },
    });
    const markersList = await this.instaGuestCollectionRepository.getMarkers(
      instaGuestUser.id,
    );
    return {
      length: markersList.length,
      markers: markersList,
    };
  }

  // async getCollections() {
  //   return await this.instaGuestCollectionRepository.getCollections();
  // }

  // async getCollectionDetail() {
  //   return await this.instaGuestCollectionRepository.getCollectionDetail();
  // }
}
