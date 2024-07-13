import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ConnectInstagramDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  instaId: string;
}
