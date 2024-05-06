import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateImageReqDto } from './dtos/create-image-req.dto';
import { ImageResDto } from './dtos/image-res.dto';

@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: 'Get all images' })
  @Get()
  async getAllImages(): Promise<ImageResDto[]> {
    return await this.imageService.getAllImages();
  }

  @ApiOperation({ summary: 'Get image' })
  @Get(':imageId')
  async getImage(@Param('imageId') imageId: string): Promise<ImageResDto> {
    return await this.imageService.getImage(parseInt(imageId));
  }

  @ApiOperation({ summary: 'Create image' })
  @Post()
  async createImage(
    @Body() createImageReqDto: CreateImageReqDto,
  ): Promise<ImageResDto> {
    return await this.imageService.createImage(createImageReqDto);
  }
}
