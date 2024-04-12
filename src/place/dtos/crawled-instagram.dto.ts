import { ApiProperty } from '@nestjs/swagger';

export class CrawledInstagramDto {
  @ApiProperty()
  placeId: string;

  @ApiProperty()
  instagramLink: string;

  @ApiProperty()
  instagramDescription: string;

  @ApiProperty()
  instgramId: string;
}
