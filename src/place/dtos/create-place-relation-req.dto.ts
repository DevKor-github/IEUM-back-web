import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceCategoryReqDto {
  @ApiProperty()
  placeId: number;

  @ApiProperty()
  categoryId: number;
}

export class createPlaceTagReqDto {
  @ApiProperty()
  placeId: number;

  @ApiProperty()
  tagId: number;
}

export class createPlaceImageReqDto {
  @ApiProperty()
  placeId: number;

  @ApiProperty()
  imageId: number;
}
