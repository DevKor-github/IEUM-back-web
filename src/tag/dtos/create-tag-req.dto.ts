import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagReqDto {
  @ApiProperty()
  @IsString()
  tagName: string;
}
