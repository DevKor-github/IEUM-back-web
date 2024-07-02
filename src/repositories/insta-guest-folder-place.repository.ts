import { Injectable } from '@nestjs/common';
import { CreateInstaGuestFolderPlaceResult } from 'src/common/interfaces/create-insta-guest-place-result.interface';
import { InstaGuestFolderPlace } from 'src/entities/insta-guest-folder-place.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class InstaGuestFolderPlaceRepository extends Repository<InstaGuestFolderPlace> {
  constructor(dataSource: DataSource) {
    super(InstaGuestFolderPlace, dataSource.createEntityManager());
  }

  async createInstaGuestFolderPlace(
    placeId: number,
    instaGuestFolderId: number,
  ): Promise<CreateInstaGuestFolderPlaceResult> {
    const instaGuestFolderPlace = await this.findOne({
      where: { instaGuestFolderId: instaGuestFolderId, placeId: placeId },
    });

    if (instaGuestFolderPlace) {
      return { status: 'existing', data: instaGuestFolderPlace };
    }

    const newInstaGuestFolderPlace = new InstaGuestFolderPlace();
    newInstaGuestFolderPlace.instaGuestFolderId = instaGuestFolderId;
    newInstaGuestFolderPlace.placeId = placeId;
    const saveNewInstaGuestFolderPlace = await this.save(
      newInstaGuestFolderPlace,
    );
    return { status: 'created', data: saveNewInstaGuestFolderPlace };
  }
}
