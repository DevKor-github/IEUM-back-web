import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInstaGuestCollectionDto {
  @IsNotEmpty()
  instaGuestUserId: number;

  @IsNotEmpty()
  placeId: number;

  @IsNotEmpty()
  link: string;

  @IsOptional()
  content: string;
}
