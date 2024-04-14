import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryReqDto {
  @ApiProperty()
  @IsString()
  categoryName: string;
}
