import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/entities/tag.entity';

export class TagResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tagName: string;

  constructor(tag: Tag) {
    this.id = tag.id;
    this.tagName = tag.tagName;
  }
}
