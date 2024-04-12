import { Body, Controller, Post } from '@nestjs/common';
import { PlaceService } from './place.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  GetPhotoByNameReqDto,
  SearchByTextReqDto,
} from './dtos/search-by-text-req.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({ summary: 'Search place by text' })
  @Post()
  async searchPlaceByText(@Body() searchByTextReqDto: SearchByTextReqDto) {
    return await this.placeService.searchPlaceByText(searchByTextReqDto.text);
  }

  // @ApiOperation({ summary: 'Get place photo' })
  // @Post('photo')
  // async getPlacePhoto(@Body() getPhotoByNameReqDto: GetPhotoByNameReqDto) {
  //   return await this.placeService.getPlacePhoto(getPhotoByNameReqDto.text);
  // }
}
