import { Injectable } from '@nestjs/common';
import { FirstLoginDto } from './dtos/first-login.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { BadRequestException } from '@nestjs/common';
import { PreferenceRepository } from 'src/repositories/preference.repository';
import { UserPreferenceDto } from './dtos/first-login.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly preferenceRepository: PreferenceRepository,
  ) {}

  //최초 유저 정보 기입
  async fillUserInfo(firstLoginDto: FirstLoginDto, id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException(
        '해당 계정이 존재하지 않아 정보를 기입할 수 없습니다.',
      );
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
}
