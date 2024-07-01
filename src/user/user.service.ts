import { Injectable } from '@nestjs/common';
import { FirstLoginDto } from './dtos/first-login.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { BadRequestException } from '@nestjs/common';
import { PreferenceRepository } from 'src/repositories/preference.repository';
import { UserPreferenceDto } from './dtos/first-login.dto';
import { NotValidUserException } from 'src/common/exceptions/user.exception';
import { InstaGuestUserRepository } from 'src/repositories/insta-guest-user.repository';
import { FolderRepository } from 'src/repositories/folder.repository';
import { FolderType } from 'src/common/enums/folder-type.enum';
import { FolderPlaceRepository } from 'src/repositories/folder-place.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly instaGuestUserRepository: InstaGuestUserRepository,
    private readonly preferenceRepository: PreferenceRepository,
    private readonly folderRepository: FolderRepository,
    private readonly folderPlaceRepository: FolderPlaceRepository,
  ) {}

  //최초 유저 정보 기입
  async fillUserInfo(firstLoginDto: FirstLoginDto, id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotValidUserException();
    }
    await this.userRepository.fillUserInfo(firstLoginDto, id);
    await this.preferenceRepository.fillUserPreference(
      new UserPreferenceDto(firstLoginDto),
      id,
    );
    const createdUser = await this.userRepository.findUserById(id);
    return { message: `${createdUser.nickname}에 대한 최초 정보 기입 성공.` };
  }

  //회원탈퇴
  async deleteUser(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException(
        '해당 계정이 존재하지 않아 삭제할 수 없습니다.',
      );
    }
    await this.userRepository.softDeleteUser(id);
  }

  async connectInstagram(userId: number, instaId: string) {
    const instaGuestUser = await this.instaGuestUserRepository.findOne({
      where: { instaId: instaId },
    });
    const user = await this.userRepository.connectInstagram(
      userId,
      instaGuestUser,
    );
    return await this.syncInstagramFolder(user.id, instaGuestUser.id);
  }

  async syncInstagramFolder(userId: number, instaGuestUserId: number) {
    const instaGuestPlaces: { place_id: number }[] =
      await this.instaGuestUserRepository.getInstaGuestPlaces(instaGuestUserId);

    const instaFolder = await this.folderRepository.getInstaFolder(userId);
    console.log(instaFolder);
    instaGuestPlaces.forEach((place) => {
      this.folderPlaceRepository.createFolderPlace(
        instaFolder.id,
        place.place_id,
      ); //어차피 syncInstagramFolder를 await로 호출할 것이므로 굳이 async-await를 사용하지 않아도 됨.
    });
    return instaFolder;
  }
}
