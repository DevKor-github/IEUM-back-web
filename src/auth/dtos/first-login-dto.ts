import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
} from 'class-validator';

export class FirstLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sex: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mbti: string;
}
