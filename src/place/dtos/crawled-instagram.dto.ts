import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CrawledInstagramDto {
  @ApiProperty()
  @IsString()
  placeId: string;

  @ApiProperty()
  @IsString()
  instagramLink: string;

  @ApiProperty()
  @IsString()
  instagramDescription: string;

  @ApiProperty()
  @IsString()
  instgramId: string;
}
