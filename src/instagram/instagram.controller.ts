import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post('/csv')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: '인스타그램 CSV 파일 정보 추출 후 DB 저장',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateInstagram(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { success: 'false', msg: 'No file uploaded' };
    }
    try {
      const csvContent = await this.instagramService.parseCSV(file);
      await this.instagramService.updateDB(csvContent);
      return {
        success: 'true',
        msg: '업데이트가 잘 이루어졌습니다.',
        csv: csvContent,
      };
    } catch (error) {
      return { success: 'false', msg: error.message };
    }
  }
}
