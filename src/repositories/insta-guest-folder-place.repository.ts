import { Injectable } from '@nestjs/common';
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
  ): Promise<InstaGuestFolderPlace> {
    const instaGuestFolderPlace = await this.findOne({
      where: { instaGuestFolderId: instaGuestFolderId, placeId: placeId },
    });

    if (instaGuestFolderPlace) {
      return instaGuestFolderPlace;
    }

    const newInstaGuestFolderPlace = new InstaGuestFolderPlace();
    newInstaGuestFolderPlace.instaGuestFolderId = instaGuestFolderId;
    newInstaGuestFolderPlace.placeId = placeId;
    const saveNewInstaGuestFolderPlace = await this.save(
      newInstaGuestFolderPlace,
    );
    return saveNewInstaGuestFolderPlace;
  }
}
