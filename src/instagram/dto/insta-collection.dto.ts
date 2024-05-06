import { ApiProperty } from '@nestjs/swagger';
import { InstaCollectionMarkerDto } from './insta-collection-marker.dto';
import { IsNotEmpty } from 'class-validator';

//카테고리, 위도, 경도, 장소 이름, 장소 id(누르면 해당 장소 디테일 볼 수 있게) + 세부 장소 상위 3개까지, 태그, 인스타그램 html 태그, 인스타그램 콘텐츠
export class InstaCollectionDto extends InstaCollectionMarkerDto {
  @ApiProperty()
  @IsNotEmpty()
  instagramDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  embeddedTag: string;

  @ApiProperty()
  @IsNotEmpty()
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  address_level1: string;

  @ApiProperty()
  @IsNotEmpty()
  address_level2: string;
}
