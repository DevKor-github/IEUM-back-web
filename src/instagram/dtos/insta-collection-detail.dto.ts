//카테고리, 위도, 경도, 장소 이름, 장소 id(누르면 해당 장소 디테일 볼 수 있게)
//+ 세부 장소 상위 3개까지, 태그, 인스타그램 html 태그, 인스타그램 콘텐츠
//+ 인스타그램 링크, 상세주소, 영업시간, 전화번호

import { ApiProperty } from '@nestjs/swagger';
import { InstaCollectionDto } from './insta-collection.dto';
import { IsNotEmpty } from 'class-validator';

export class InstaCollectionDetailDto extends InstaCollectionDto {
  @ApiProperty()
  @IsNotEmpty()
  link: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  openHours: string[];

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;
}
