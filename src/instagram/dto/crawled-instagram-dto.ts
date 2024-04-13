import { IsNotEmpty, IsOptional } from 'class-validator';

export class CrawledInstagramDto {
  @IsNotEmpty()
  instagramId: string;

  @IsNotEmpty()
  googlePlaceId: string;

  @IsNotEmpty()
  instagramLink: string;

  @IsOptional()
  content: string;
}
