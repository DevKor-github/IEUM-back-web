import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInstaGuestCollectionDto {
  @IsNotEmpty()
  instaGuestUserId: number;

  @IsNotEmpty()
  placeId: number;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  embeddedTag: string;

  @IsOptional()
  content: string;
}
