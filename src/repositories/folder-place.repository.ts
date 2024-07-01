import { Injectable } from '@nestjs/common';
import { FolderPlace } from 'src/entities/folder-place.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FolderPlaceRepository extends Repository<FolderPlace> {
  private readonly folderPlaceRepository: Repository<FolderPlace>;
  constructor(private readonly dataSource: DataSource) {
    super(FolderPlace, dataSource.createEntityManager());
  }

  async createFolderPlace(folderId: number, placeId: number) {
    const folderPlace = await this.findOne({
      where: { folderId: folderId, placeId: placeId },
    });
    if (folderPlace) {
      return folderPlace;
    }
    const newFolderPlace = new FolderPlace();
    newFolderPlace.folderId = folderId;
    newFolderPlace.placeId = placeId;
    const saveNewFolderPlace = await this.save(newFolderPlace);
    return saveNewFolderPlace;
  }
}
