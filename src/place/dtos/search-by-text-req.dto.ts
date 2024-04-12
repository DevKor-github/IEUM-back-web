import { ApiProperty } from '@nestjs/swagger';

export class SearchByTextReqDto {
  @ApiProperty()
  text: string;
}
