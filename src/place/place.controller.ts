import { Body, Controller, Post } from '@nestjs/common';
import { PlaceService } from './place.service';
import { ApiOperation } from '@nestjs/swagger';
import { SearchByTextReqDto } from './dtos/search-by-text-req.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({ summary: 'Search place by text' })
  @Post()
  async searchByText(@Body() searchByTextReqDto: SearchByTextReqDto) {
    return this.placeService.searchByText(searchByTextReqDto.text);
  }
}
