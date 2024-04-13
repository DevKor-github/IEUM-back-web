import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryRes } from './dtos/category-res.dto';
import { CreateCategoryReqDto } from './dtos/create-category-req.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  async getAllCategories(): Promise<CategoryRes[]> {
    return await this.categoryService.getAllCategories();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @Get(':categoryId')
  async getCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<CategoryRes> {
    return await this.categoryService.getCategory(parseInt(categoryId));
  }

  @ApiOperation({ summary: 'Create category' })
  @Post()
  async createCategory(
    @Body() createCategoryReqDto: CreateCategoryReqDto,
  ): Promise<CategoryRes> {
    return await this.categoryService.createCategory(createCategoryReqDto);
  }
}
