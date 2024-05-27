import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AppleLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  oAuthId: string;
}
