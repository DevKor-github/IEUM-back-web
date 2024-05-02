import { DataSource, Repository } from 'typeorm';
import { Category } from './../entities/category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  private categoryRepository: Repository<Category>;

  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async saveCategoryArray(types: string[]): Promise<Category[]> {
    const categories: Category[] = [];

    types.map(async (type) => {
      let category = await this.findOne({ where: { categoryName: type } });
      if (!category) {
        category = new Category();
        category.categoryName = type;
        category = await this.save({ categoryName: type });
      }
      categories.push(category);
    });
    return categories;
  }
}
