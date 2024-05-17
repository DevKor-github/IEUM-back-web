import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class UserInfoDto {
  @IsString()
  oAuthId: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;

  @IsBoolean()
  initialLogin: boolean;

  static fromCreation(
    oAuthId: string,
    accessToken: string,
    refreshToken: string,
  ): UserInfoDto {
    const dto = new UserInfoDto();
    dto.oAuthId = oAuthId;
    dto.accessToken = accessToken;
    dto.refreshToken = refreshToken;
    return dto;
  }
}
