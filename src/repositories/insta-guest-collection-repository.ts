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
    const newInstaGuestCollection = this.create(createInstaGuestCollectionDto);
    const saveNewInstaGuestCollection = await this.save(
      newInstaGuestCollection,
    );
    return saveNewInstaGuestCollection;
  }
}
