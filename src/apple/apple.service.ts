import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/repositories/user.repository';
import { UserInfoDto } from './dtos/userInfo-dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AppleService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async appleLogin(authId: string) {
    const user = await this.userRepository.findUserByAppleAuthId(authId);

    //만약 계정이 존재한다면
    if (user) {
      const accessToken = this.authService.getAccessToken(user);
      const refreshToken = this.authService.getRefreshToken(user);
      const hashedRefreshToken =
        await this.authService.hashRefreshToken(refreshToken);
      //계정이 존재하면 DB 상의 유저 refreshToken만 update
      await this.userRepository.renewRefreshToken(authId, hashedRefreshToken);
      return UserInfoDto.fromCreation(
        authId,
        accessToken,
        refreshToken,
        user.initialLogin,
      );
    }

    //계정이 없다면 새로 추가
    const randomPassword = await this.randomHashedPassword();
    const newUser = await this.userRepository.appleSignIn(
      authId,
      randomPassword,
    );
    const accessToken = this.authService.getAccessToken(newUser);
    const refreshToken = this.authService.getRefreshToken(newUser);
    const hashedRefreshToken =
      await this.authService.hashRefreshToken(refreshToken);
    await this.userRepository.renewRefreshToken(authId, hashedRefreshToken);
    return UserInfoDto.fromCreation(
      authId,
      accessToken,
      refreshToken,
      newUser.initialLogin,
    );
  }

  async randomHashedPassword(): Promise<string> {
    const salt = await bcrypt.genSalt(10); //복잡도 10의 salt를 생성
    const randomBytes = crypto.randomBytes(16);
    const hashedRandomBytes = await bcrypt.hash(randomBytes, salt);

    return hashedRandomBytes;
  }
}
