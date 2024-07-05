import { Controller, Get } from '@nestjs/common';
import { FolderService } from './folder.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('폴더 관련 api')
@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get('/')
  async getFoldersList() {}

  @Get('/:folderId')
  async getFolderByFolderId() {}
}
