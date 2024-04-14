import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/repositories/category.repository';
import { CategoryRes } from './dtos/category-res.dto';
import { CreateCategoryReqDto } from './dtos/create-category-req.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories(): Promise<CategoryRes[]> {
    const categoriesList = await this.categoryRepository.find();
    return categoriesList.map((category) => new CategoryRes(category));
  }

  async getCategory(categoryId: number): Promise<CategoryRes> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return new CategoryRes(category);
  }

  async createCategory(
    createCategoryReqDto: CreateCategoryReqDto,
  ): Promise<CategoryRes> {
    const existedCategory = await this.categoryRepository.findOne({
      where: { categoryName: createCategoryReqDto.categoryName },
    });
    if (existedCategory) {
      return new CategoryRes(existedCategory);
    }
    return new CategoryRes(
      await this.categoryRepository.save({
        categoryName: createCategoryReqDto.categoryName,
      }),
    );
  }

  async deleteCategory() {}
}
