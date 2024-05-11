import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InstaGuestCollection } from 'src/entities/insta-guest-collection.entity';
import { CreateInstaGuestCollectionDto } from 'src/instagram/dtos/create-insta-guest-collection-dto';
import { INSTA_COLLECTIONS_TAKE } from 'src/common/constants/pagination.constant';

@Injectable()
export class InstaGuestCollectionRepository extends Repository<InstaGuestCollection> {
  constructor(dataSource: DataSource) {
    super(InstaGuestCollection, dataSource.createEntityManager());
  }

  async createInstaGuestCollection(
    createInstaGuestCollectionDto: CreateInstaGuestCollectionDto,
  ): Promise<InstaGuestCollection> {
    //한 아이디로 저장한 장소-게시글 쌍에 대한 중복 체크
    const instaGuestCollection = await this.findOne({
      where: {
        instaGuestUserId: createInstaGuestCollectionDto.instaGuestUserId,
        placeId: createInstaGuestCollectionDto.placeId,
        link: createInstaGuestCollectionDto.link,
      },
    });
    if (instaGuestCollection) {
      return null;
    }
    const newInstaGuestCollection = this.create(createInstaGuestCollectionDto);
    const saveNewInstaGuestCollection = await this.save(
      newInstaGuestCollection,
    );
    return saveNewInstaGuestCollection;
  }

  async getMarkers(instaGuestUserId: number) {
    return await this.createQueryBuilder('instaGuestCollection')
      .leftJoinAndSelect('instaGuestCollection.place', 'place')
      .leftJoinAndSelect('place.placeCategories', 'placeCategories')
      .leftJoinAndSelect('placeCategories.category', 'category')
      .select([
        'instaGuestCollection.id AS InstaGuestCollectionId',
        'instaGuestCollection.placeId AS placeId',
        'place.name AS placeName',
        'place.latitude AS latitude',
        'place.longitude AS longitude',
        'JSON_AGG(DISTINCT category.categoryName) AS categories',
      ])
      .where('instaGuestCollection.instaGuestUserId = :instaGuestUserId', {
        instaGuestUserId,
      })
      .groupBy('instaGuestCollection.id')
      .addGroupBy('place.id')
      .getRawMany();
  }

  async getCollections(
    instaGuestUserId: number,
    region?: string,
    cursorId?: number,
  ) {
    const query = this.createQueryBuilder('instaGuestCollection')
      .leftJoinAndSelect('instaGuestCollection.place', 'place')
      .leftJoinAndSelect('place.placeCategories', 'placeCategories')
      .leftJoinAndSelect('placeCategories.category', 'category')
      .leftJoinAndSelect('place.placeTags', 'placeTags')
      .leftJoinAndSelect('placeTags.tag', 'tag')
      .leftJoinAndSelect('place.addressComponents', 'addressComponents')
      .select([
        'instaGuestCollection.id AS InstaGuestCollectionId',
        'instaGuestCollection.placeId AS placeId',
        'instaGuestCollection.content AS instagramDescription',
        'instaGuestCollection.embeddedTag AS embeddedTag',
        'place.name AS placeName',
        'place.latitude AS latitude',
        'place.longitude AS longitude',
        'JSON_AGG(DISTINCT category.categoryName) AS categories',
        'JSON_AGG(DISTINCT tag.tagName) AS tags',
        'addressComponents.administrativeAreaLevel1 AS address_level1',
        'COALESCE(addressComponents.locality, addressComponents.sublocalityLevel1) AS address_level2',
      ])
      .where('instaGuestCollection.instaGuestUserId = :instaGuestUserId', {
        instaGuestUserId,
      })
      .groupBy('instaGuestCollection.id')
      .addGroupBy('place.id')
      .addGroupBy('addressComponents.id')
      .orderBy('instaGuestCollection.id', 'DESC')
      .take(INSTA_COLLECTIONS_TAKE + 1);

    if (region) {
      query.andWhere('addressComponents.administrativeAreaLevel1 = :region', {
        region: `${region}%`,
      }); // 특정 문자열로 시작하는 경우에는 인덱스를 타므로 성능 문제 X
    }

    if (cursorId) {
      query.andWhere('instaGuestCollection.id < :cursorId', {
        cursorId,
      });
    }

    return await query.getRawMany();
  }

  async getCollectionDetail(
    instaGuestUserId: number,
    instaGuestCollectionId: number,
  ) {
    return await this.createQueryBuilder('instaGuestCollection')
      .leftJoinAndSelect('instaGuestCollection.place', 'place')
      .leftJoinAndSelect('place.openHours', 'openHours')
      .leftJoinAndSelect('place.placeCategories', 'placeCategories')
      .leftJoinAndSelect('placeCategories.category', 'category')
      .leftJoinAndSelect('place.placeTags', 'placeTags')
      .leftJoinAndSelect('placeTags.tag', 'tag')
      .leftJoinAndSelect('place.addressComponents', 'addressComponents')
      .select([
        'instaGuestCollection.id AS InstaGuestCollectionId',
        'instaGuestCollection.placeId AS placeId',
        'instaGuestCollection.content AS instagramDescription',
        'instaGuestCollection.embeddedTag AS embeddedTag',
        'instaGuestCollection.link AS link',
        'place.name AS placeName',
        'place.latitude AS latitude',
        'place.longitude AS longitude',
        'place.address AS address',
        'place.phoneNumber AS phoneNumber',
        'openHours.opening AS openHours',
        'JSON_AGG(DISTINCT category.categoryName) AS categories',
        'JSON_AGG(DISTINCT tag.tagName) AS tags',
        'addressComponents.administrativeAreaLevel1 AS address_level1',
        'COALESCE(addressComponents.locality, addressComponents.sublocalityLevel1) AS address_level2',
      ])
      .where('instaGuestCollection.instaGuestUserId = :instaGuestUserId', {
        instaGuestUserId,
      })
      .andWhere('instaGuestCollection.id = :instaGuestCollectionId', {
        instaGuestCollectionId,
      })
      .groupBy('instaGuestCollection.id')
      .addGroupBy('place.id')
      .addGroupBy('addressComponents.id')
      .addGroupBy('openHours.id')
      .getRawOne();
  }
}

// export class InstaCollectionDetailDto extends InstaCollectionDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   link: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   address: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   openHours: string[];

//   @ApiProperty()
//   @IsNotEmpty()
//   phoneNumber: string;
// }
