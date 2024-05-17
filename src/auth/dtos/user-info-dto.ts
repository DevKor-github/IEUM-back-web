import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class UserInfoDto {
  @IsString()
  authId: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;

  @IsBoolean()
  initialLogin: boolean;

  static fromCreation(
    authId: string,
    accessToken: string,
    refreshToken: string,
  ): UserInfoDto {
    const dto = new UserInfoDto();
    dto.authId = authId;
    dto.accessToken = accessToken;
    dto.refreshToken = refreshToken;
    return dto;
  }
}
