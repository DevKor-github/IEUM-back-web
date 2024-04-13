import { Injectable } from '@nestjs/common';
import { InstaGuestUserRepository } from '../repositories/insta-guest-user-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InstaGuestCollectionRepository } from 'src/repositories/insta-guest-collection-repository';
import { InstaGuestCollection } from 'src/entities/insta-guest-collection.entity';
import { CrawledInstagramDto } from './dto/crawled-instagram-dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class InstagramService {
  constructor(
    @InjectRepository(InstaGuestUserRepository)
    private readonly instaGuestUserRepository: InstaGuestUserRepository,
    @InjectRepository(InstaGuestCollectionRepository)
    private readonly instaGuestCollectionRepository: InstaGuestCollectionRepository,
  ) {}

  //각 function call 내부에서는 db수정이 한 번 밖에 일어나지 않으므로 (연쇄적이지 않음) transaction으로 처리할 필요가 없어보임.
  //단, function call들의 일련의 과정은 transaction으로 처리하면 좋겠다 생각해서 transaction으로 처리해봄.
  @Transactional()
  async crawlToDB(
    crawledInstagramDto: CrawledInstagramDto[],
  ): Promise<InstaGuestCollection[]> {
    const createdInstaGuestCollection = [];

    for (const dto of crawledInstagramDto) {
      try {
        // const placeInfo = await this.placeService.createPlaceByGooglePlaceId(
        //   dto.googlePlaceId,
        // );
        const instaGuestUser =
          await this.instaGuestUserRepository.createInstaGuestUser({
            instaId: dto.instagramId,
          });
        const instaGuestCollection =
          await this.instaGuestCollectionRepository.createInstaGuestCollection({
            instaGuestUserId: instaGuestUser.id,
            placeId: 1, //placeInfo.id
            link: dto.instagramLink,
            content: dto.instagramDescription,
          });
        if (instaGuestCollection) {
          //null값이 아니다 -> 새롭게 저장됐다.
          createdInstaGuestCollection.push(instaGuestCollection);
        }
      } catch (error) {
        //에러를 호출자에게 전파 및 for loop 중단.
        throw error;
      }
    }

    return createdInstaGuestCollection;
  }
}
