import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceReqDto {
  @ApiProperty()
  googlePlaceId: string;
}
