import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  address: string;

  @IsOptional()
  latitude: number;

  @IsOptional()
  longitude: number;
}
