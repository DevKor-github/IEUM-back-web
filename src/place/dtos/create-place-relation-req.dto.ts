import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceCategoryReqDto {
  @ApiProperty()
  placeId: number;

  @ApiProperty()
  categoryId: number;
}

export class CreatePlaceTagReqDto {
  @ApiProperty()
  placeId: number;

  @ApiProperty()
  tagId: number;
}

export class CreatePlaceImageReqDto {
  @ApiProperty()
  placeId: number;

  @ApiProperty()
  imageId: number;
}
