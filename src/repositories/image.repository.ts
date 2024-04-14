import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Image } from './../entities/image.entity';

@Injectable()
export class ImageRepository extends Repository<Image> {
  private imageRepository: Repository<Image>;

  constructor(private readonly dataSource: DataSource) {
    super(Image, dataSource.createEntityManager());
  }
}
