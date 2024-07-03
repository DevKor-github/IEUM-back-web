import { Injectable } from '@nestjs/common';
import { FolderPlaceRepository } from 'src/repositories/folder-place.repository';
import { FolderRepository } from 'src/repositories/folder.repository';

@Injectable()
export class FolderService {
  constructor(
    private readonly folderRepository: FolderRepository,
    private readonly folderPlaceRepository: FolderPlaceRepository,
  ) {}

  async getFoldersList(userId?: number) {}

  async getFolderByFolderId(folderId: number) {}

  async getInstaFolder(userId: number) {
    return await this.folderRepository.getInstaFolder(userId);
  }

  async getDefaultFolder(userId: number) {
    return await this.folderRepository.getDefaultFolder(userId);
  }

  async createFolderPlace(folderId: number, placeId: number) {
    return await this.folderPlaceRepository.createFolderPlace(
      folderId,
      placeId,
    );
  }

  async appendPlaceToInstaFolder(connectedUserId: number, placeId: number) {
    const instaFolder =
      await this.folderRepository.getInstaFolder(connectedUserId);
    const createdFolderPlace = await this.createFolderPlace(
      instaFolder.id,
      placeId,
    );
    return createdFolderPlace;
  }
}
