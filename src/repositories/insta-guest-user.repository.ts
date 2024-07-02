import { InstaGuestUser } from '../entities/insta-guest-user.entity';
import { Injectable } from '@nestjs/common';
import { CreateInstaGuestUserDto } from 'src/instagram/dtos/create-insta-guest-user-dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InstaGuestUserRepository extends Repository<InstaGuestUser> {
  constructor(dataSource: DataSource) {
    super(InstaGuestUser, dataSource.createEntityManager());
  }

  async createInstaGuestUser(
    createInstaGuestUserDto: CreateInstaGuestUserDto,
  ): Promise<InstaGuestUser> {
    const instaGuestUser = await this.findOne({
      where: { instaId: createInstaGuestUserDto.instaId },
      relations: ['user'],
    });
    // console.log(instaGuestUser);

    //유저 정보가 이미 존재한다면
    if (instaGuestUser) {
      return instaGuestUser;
    }

    const newInstaGuestUser = new InstaGuestUser();
    newInstaGuestUser.instaId = createInstaGuestUserDto.instaId;
    const saveNewInstaGuestUser = await this.save(newInstaGuestUser);
    return saveNewInstaGuestUser;
  }

  async getInstaGuestPlaces(
    instaGuestUserId: number,
  ): Promise<{ place_id: number }[]> {
    const instaGuestPlaces = await this.createQueryBuilder('instaGuestUser')
      .leftJoin('instaGuestUser.instaGuestFolder', 'instaGuestFolder')
      .leftJoin(
        'instaGuestFolder.instaGuestFolderPlaces',
        'instaGuestFolderPlace',
      )
      .select(['instaGuestFolderPlace.placeId AS place_id'])
      .where('instaGuestUser.id = :instaGuestUserId', { instaGuestUserId })
      .getRawMany();
    return instaGuestPlaces;
  }
}
