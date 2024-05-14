import { IsNotEmpty } from 'class-validator';

export class CreateInstaGuestUserDto {
  @IsNotEmpty()
  instaId: string;
}
