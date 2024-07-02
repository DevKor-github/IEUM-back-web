import { InstaGuestFolderPlaceRepository } from './../repositories/insta-guest-folder-place.repository';
import { InstaGuestFolder } from './../entities/insta-guest-folder.entity';
import { InstaCollectionReqQueryDto } from './dtos/insta-collection-req-query.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
import { CATEGORIES_MAPPING } from 'src/common/constants/categories-mapping.constant';
import { CATEGORIES_TRANSLATED } from 'src/common/constants/categories-translated.constant';
import {
  InstaCollectionDto,
  InstaCollectionsListDto,
} from './dtos/insta-collection.dto';
import { InstaCollectionDetailDto } from './dtos/insta-collection-detail.dto';
import { InstaGuestFolderRepository } from 'src/repositories/insta-guest-folder.repository';
import { FolderRepository } from 'src/repositories/folder.repository';
import { FolderPlaceRepository } from 'src/repositories/folder-place.repository';

@Injectable()
export class InstagramService {
  constructor(
    private readonly placeService: PlaceService,
    private readonly instaGuestUserRepository: InstaGuestUserRepository,
    private readonly instaGuestCollectionRepository: InstaGuestCollectionRepository,
    private readonly instaGuestFolderRepository: InstaGuestFolderRepository,
    private readonly instaGuestFolderPlaceRepository: InstaGuestFolderPlaceRepository,
    private readonly folderRepository: FolderRepository,
    private readonly folderPlaceRepository: FolderPlaceRepository,
  ) {}

  async test(instaId: string) {
    const instaGuestUser = await this.instaGuestUserRepository.findOne({
      where: { instaId: instaId },
      relations: ['user'],
    });
    return instaGuestUser.user ? instaGuestUser.user : 'no user';
  }
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
        const instaGuestFolder =
          await this.instaGuestFolderRepository.createInstaGuestFolder(
            instaGuestUser,
          );
        const createdFolderPlace =
          await this.instaGuestFolderPlaceRepository.createInstaGuestFolderPlace(
            placeInfo.id,
            instaGuestFolder.id,
          );
        if (createdFolderPlace.status === 'created' && instaGuestUser.user) {
          const appendeFolderPlace = await this.appendPlaceToInstaFolder(
            instaGuestUser.id,
            placeInfo.id,
          );
          if (appendeFolderPlace) console.log('appended!');
        }
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

  async getMarkers(instaId: string): Promise<InstaCollectionMarkersListDto> {
    const instaGuestUser = await this.instaGuestUserRepository.findOne({
      where: { instaId: instaId },
    });
    if (!instaGuestUser) {
      throw new NotFoundException('해당하는 인스타그램 사용자가 없습니다.');
    }
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

  async getCollections(
    instaId: string,
    instaCollectionReqQueryDto: InstaCollectionReqQueryDto,
  ): Promise<InstaCollectionsListDto> {
    const instaGuestUser = await this.instaGuestUserRepository.findOne({
      where: { instaId: instaId },
    });
    if (!instaGuestUser) {
      throw new NotFoundException('해당하는 인스타그램 사용자가 없습니다.');
    }
    const rawInstaCollections =
      await this.instaGuestCollectionRepository.getCollections(
        instaGuestUser.id,
        instaCollectionReqQueryDto.region,
        instaCollectionReqQueryDto.cursorId,
      );
    const collectionsList = rawInstaCollections.map((rawCollection) => {
      rawCollection.primary_category = this.translateCategoryName(
        rawCollection.primary_category,
      );
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
    if (!instaGuestUser) {
      throw new NotFoundException('해당하는 인스타그램 사용자가 없습니다.');
    }
    const rawDetail =
      await this.instaGuestCollectionRepository.getCollectionDetail(
        instaGuestUser.id,
        instaGuestCollectionId,
      );
    if (!rawDetail) {
      throw new NotFoundException('해당하는 컬렉션이 없습니다.');
    }
    rawDetail.primary_category = this.translateCategoryName(
      rawDetail.primary_category,
    );
    return new InstaCollectionDetailDto(rawDetail);
  }

  async appendPlaceToInstaFolder(connectedUserId: number, placeId: number) {
    const instaFolder =
      await this.folderRepository.getInstaFolder(connectedUserId);
    const createdFolderPlace =
      await this.folderPlaceRepository.createFolderPlace(
        instaFolder.id,
        placeId,
      );
    return createdFolderPlace;
  }

  determineRepresentativeCategory(category: string): string {
    for (const [newCategory, oldCategories] of Object.entries(
      CATEGORIES_MAPPING,
    )) {
      if (oldCategories.includes(category)) {
        return newCategory;
      }
    }
    return 'Others';
  }

  translateCategoryName(category: string): string {
    if (CATEGORIES_TRANSLATED[category]) {
      return CATEGORIES_TRANSLATED[category];
    }
    return '기타';
  }
}
