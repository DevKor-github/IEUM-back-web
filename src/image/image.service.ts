import { Injectable } from '@nestjs/common';
import { ImageRepository } from 'src/repositories/image.repository';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async getImage(imageId: number) {
    return await this.imageRepository.findOne({ where: { id: imageId } });
  }

  async createImage() {}

  async updateImage() {}

  async deleteImage() {}
}
