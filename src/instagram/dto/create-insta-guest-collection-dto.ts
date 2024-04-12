import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateInstaGuestCollectionDto {
  @IsUUID()
  @IsNotEmpty()
  instaGuestUserId: string;

  @IsNotEmpty()
  placeId: number;

  @IsNotEmpty()
  link: string;

  @IsOptional()
  content: string;
}
