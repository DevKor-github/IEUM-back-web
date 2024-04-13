import { Injectable, NotFoundException } from '@nestjs/common';
import { ImageRepository } from 'src/repositories/image.repository';
import { ImageResDto } from './dtos/image-res.dto';
import { CreateImageReqDto } from './dtos/create-image-req.dto';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async getAllImages(): Promise<ImageResDto[]> {
    const imagesList = await this.imageRepository.find();
    return imagesList.map((image) => new ImageResDto(image));
  }

  async getImage(imageId: number): Promise<ImageResDto> {
    const image = await this.imageRepository.findOne({
      where: { id: imageId },
    });
    if (!image) throw new NotFoundException('Image not found');

    return new ImageResDto(image);
  }

  async createImage(
    createImageReqDto: CreateImageReqDto,
  ): Promise<ImageResDto> {
    const existedImage = await this.imageRepository.findOne({
      where: { url: createImageReqDto.url },
    });
    if (existedImage) {
      return new ImageResDto(existedImage);
    }
    return new ImageResDto(
      await this.imageRepository.save({ url: createImageReqDto.url }),
    );
  }

  async deleteImage() {}
}
