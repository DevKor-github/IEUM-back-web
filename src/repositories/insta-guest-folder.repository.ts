import { Injectable } from '@nestjs/common';
import { InstaGuestFolder } from 'src/entities/insta-guest-folder.entity';
import { InstaGuestUser } from 'src/entities/insta-guest-user.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class InstaGuestFolderRepository extends Repository<InstaGuestFolder> {
  constructor(dataSource: DataSource) {
    super(InstaGuestFolder, dataSource.createEntityManager());
  }

  async createInstaGuestFolder(
    instaGuestUser: InstaGuestUser,
  ): Promise<InstaGuestFolder> {
    const instaGuestFolder = await this.findOne({
      where: { instaGuestUser: instaGuestUser },
    });

    if (instaGuestFolder) {
      return instaGuestFolder;
    }

    const newInstaGuestFolder = new InstaGuestFolder();
    newInstaGuestFolder.instaGuestUser = instaGuestUser;
    const saveNewInstaGuestFolder = await this.save(newInstaGuestFolder);
    return saveNewInstaGuestFolder;
  }
}
