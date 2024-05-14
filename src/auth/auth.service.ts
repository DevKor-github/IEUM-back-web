import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/entities/user.entity';
import { FirstLoginDto } from './dtos/firstLogin-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  //AccessToken 발급
  getAccessToken(user: User) {
    return this.jwtService.sign(
      {
        id: user.id,
        phoneNumber: user.phoneNumber,
      },
      { secret: process.env.SECRET_KEY_ACCESS, expiresIn: '12h' },
    );
  }

  //refreshToken 발급
  getRefreshToken(user: User) {
    return this.jwtService.sign(
      {
        id: user.id,
        phoneNumber: user.phoneNumber,
      },
      { secret: process.env.SECRET_KEY_REFRESH, expiresIn: '6M' },
    );
  }

  //refreshToken 암호화
  async hashRefreshToken(refreshToken: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); //복잡도 10의 salt를 생성
    const hashedJwtRefresh = await bcrypt.hash(refreshToken, salt);

    return hashedJwtRefresh;
  }

  // RefreshToken이 DB에 저장되어 있는 것과 일치하는지 확인.
  async compareRefreshToken(
    refreshToken: string,
    hashedRefreshToken: string,
  ): Promise<boolean> {
    return await bcrypt.compare(refreshToken, hashedRefreshToken);
  }

  //AccessToken 재발급
  async newAccessToken(id: number, refreshToken: string) {
    //refreshToken이 해당 유저의 refreshtoken이 맞는지 체크
    const user = await this.userRepository.findUserById(id);
    const isRefreshTokenMatch = await this.compareRefreshToken(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenMatch) {
      throw new UnauthorizedException('Refresh Token이 일치하지 않습니다.');
    }
    const newAccessToken = this.getAccessToken(user);

    return {
      message: 'Access Token 재발급 성공',
      AccessToken: newAccessToken,
    };
  }

  //회원탈퇴
  async deleteUser(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException(
        '해당 계정이 존재하지 않아 삭제할 수 없습니다.',
      );
    }
    await this.userRepository.deleteUser(id);
    return { message: `${user.phoneNumber} 계정이 회원 탈퇴 되었습니다.` };
  }

  //최초 유저 정보 기입

  async fillUserInfo(firstLoginDto: FirstLoginDto, id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException(
        '해당 계정이 존재하지 않아 정보를 기입할 수 없습니다.',
      );
    }
    await this.userRepository.fillUserInfo(firstLoginDto, id);
    return { message: `${user.phoneNumber} 최초 정보가 기입 되었습니다.` };
  }
}
