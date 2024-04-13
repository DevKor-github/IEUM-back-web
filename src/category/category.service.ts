import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategory(categoryId: number) {
    return await this.categoryRepository.findOne({ where: { id: categoryId } });
  }

  async createCategory() {}

  async updateCategory() {}

  async deleteCategory() {}
}
