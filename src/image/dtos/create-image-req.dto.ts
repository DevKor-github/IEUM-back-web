import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateImageReqDto {
  @ApiProperty()
  @IsString()
  url: string;
}
// 아직 유저의 이미지 업로드를 고려하지 않음. Image row 생성을 위해 사용
