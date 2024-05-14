import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { FirstLoginDto } from 'src/auth/dtos/firstLogin-dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUserByAppleAuthId(authId: string): Promise<User> {
    const user = this.findOne({ where: { phoneNumber: authId } });
    return user;
  }

  async findUserById(id: number): Promise<User> {
    const user = this.findOne({ where: { id: id } });
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id);
    await this.remove(user);
  }

  async appleSignIn(authId: string, randomPassword: string): Promise<User> {
    //애플 최초 로그인 시 phoneNumber를 email로 한 user 생성.
    //이 경우 비밀번호는 존재 X
    //로그인 후 앱 자체 회원가입 직후 flow 통한 나머지 field 채워야 함.
    const user = this.create({ phoneNumber: authId, password: randomPassword });
    return await this.save(user);
  }

  async renewRefreshToken(authId: string, refreshToken: string) {
    const user = await this.findUserByAppleAuthId(authId);
    user.refreshToken = refreshToken;
    return await this.save(user);
  }

  async fillUserInfo(firstLoginDto: FirstLoginDto, id: number) {
    const user = await this.findUserById(id);

    user.nickname = firstLoginDto.nickname;
    user.birthDate = new Date(firstLoginDto.birthDate);
    user.sex = firstLoginDto.sex;
    user.mbti = firstLoginDto.mbti;

    //최초 로그인 아님을 front에 전달하는 역할
    user.initialLogin = false;

    return await this.save(user);
  }
}
