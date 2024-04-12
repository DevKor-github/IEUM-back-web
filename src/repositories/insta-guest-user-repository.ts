import { InstaGuestUser } from '../entities/insta-guest-user.entity';
import { Injectable } from '@nestjs/common';
import { CreateInstaGuestUserDto } from 'src/instagram/dto/create-insta-guest-user-dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InstaGuestUserRepository extends Repository<InstaGuestUser> {
  constructor(dataSource: DataSource) {
    super(InstaGuestUser, dataSource.createEntityManager());
  }

  async createInstaGuestUser(
    createInstaGuestUserDto: CreateInstaGuestUserDto,
  ): Promise<string> {
    const instaUser = await this.findOne({
      where: { instaId: createInstaGuestUserDto.instaId },
    });
    console.log(instaUser);

    //유저 정보가 이미 존재한다면
    if (instaUser) {
      console.log('True');
      //string 과 uuid 비교 문제 생길수도 있으니 다시 확인!
      return instaUser.id;
    }

    const newInstaUser = new InstaGuestUser();
    newInstaUser.instaId = createInstaGuestUserDto.instaId;
    const saveNewInstaUser = await this.save(newInstaUser);
    return saveNewInstaUser.id;
  }
}
