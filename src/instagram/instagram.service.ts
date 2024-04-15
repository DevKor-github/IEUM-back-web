import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InstaGuestUserRepository } from '../repositories/insta-guest-user.repository';
import { InstaGuestCollectionRepository } from 'src/repositories/insta-guest-collection.repository';
import { InstaGuestCollection } from 'src/entities/insta-guest-collection.entity';
import { CrawledInstagramDto } from './dto/crawled-instagram-dto';
import { PlaceService } from 'src/place/place.service';

@Injectable()
export class InstagramService {
  constructor(
    // @InjectRepository(InstaGuestUserRepository)
    private readonly placeService: PlaceService,
    private readonly instaGuestUserRepository: InstaGuestUserRepository,
    // @InjectRepository(InstaGuestCollectionRepository)
    private readonly instaGuestCollectionRepository: InstaGuestCollectionRepository,
  ) {}

  //각 function call 내부에서의 db수정이 한 번 밖에 일어나지 않으므로 (연쇄적이지 않음) transaction으로 처리할 필요가 없어보임.

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
}
