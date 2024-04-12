import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PlaceRepository } from 'src/repositories/place.repository';
import { OpenHoursRepository } from 'src/repositories/open-hours.repository';
import { CategoryRepository } from 'src/repositories/category.repository';
import { PlaceCategoryRepository } from 'src/repositories/place-category.repository';

@Module({
  controllers: [PlaceController],
  providers: [
    PlaceService,
    PlaceRepository,
    OpenHoursRepository,
    CategoryRepository,
    PlaceCategoryRepository,
  ],
})
export class PlaceModule {}
