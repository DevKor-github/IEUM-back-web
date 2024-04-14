import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/entities/category.entity';

export class CategoryRes {
  @ApiProperty()
  id: number;

  @ApiProperty()
  categoryName: string;

  constructor(category: Category) {
    this.id = category.id;
    this.categoryName = category.categoryName;
  }
}
