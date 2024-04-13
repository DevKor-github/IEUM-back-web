import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InstaGuestCollection } from 'src/entities/insta-guest-collection.entity';
import { CreateInstaGuestCollectionDto } from 'src/instagram/dto/create-insta-guest-collection-dto';

@Injectable()
export class InstaGuestCollectionRepository extends Repository<InstaGuestCollection> {
  constructor(dataSource: DataSource) {
    super(InstaGuestCollection, dataSource.createEntityManager());
  }

  async createInstaGuestCollection(
    createInstaGuestCollectionDto: CreateInstaGuestCollectionDto,
  ): Promise<InstaGuestCollection> {
    //똑같은 인스타 아이디로 똑같은 릴스에 대한 서비스 요청 처리-> 중복 저장 x
    const instaGuestCollection = await this.findOne({
      where: {
        instaGuestUserId: createInstaGuestCollectionDto.instaGuestUserId,
        link: createInstaGuestCollectionDto.link,
      },
    });
    if (instaGuestCollection) {
      //이미 똑같은 릴스를 저장한적이 있다면 새롭게 저장하지 않음.
      return instaGuestCollection;
    }
    const newInstaGuestCollection = this.create(createInstaGuestCollectionDto);
    const saveNewInstaGuestCollection = await this.save(
      newInstaGuestCollection,
    );
    return saveNewInstaGuestCollection;
  }
}
