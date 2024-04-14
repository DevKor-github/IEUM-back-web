import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'src/entities/image.entity';

export class ImageResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;

  constructor(image: Image) {
    this.id = image.id;
    this.url = image.url;
  }
}
