import { ApiProperty } from '@nestjs/swagger';

export class InstaCollectionReqQueryDto {
  @ApiProperty({
    description: '다음 페이지 탐색을 위한 컬렉션 커서 id',
    required: false,
  })
  cursorId: number;

  @ApiProperty({ description: '지역', required: false })
  region: string;
}
