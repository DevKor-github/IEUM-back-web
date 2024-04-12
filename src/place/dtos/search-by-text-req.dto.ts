import { ApiProperty } from '@nestjs/swagger';

export class SearchByTextReqDto {
  @ApiProperty()
  text: string;
}

export class GetPhotoByNameReqDto {
  @ApiProperty()
  text: string;
}
