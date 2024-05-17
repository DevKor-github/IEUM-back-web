import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsArray,
  IsInt,
  Min,
  Max,
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

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  preferredRegion: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  preferredCompanion: string[];

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  budgetStyle: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  planningStyle: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  scheduleStyle: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  destinationStyle1: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  destinationStyle2: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  destinationStyle3: number;
}

export class UserPreferenceDto extends PickType(FirstLoginDto, [
  'preferredRegion',
  'preferredCompanion',
  'budgetStyle',
  'planningStyle',
  'scheduleStyle',
  'destinationStyle1',
  'destinationStyle2',
  'destinationStyle3',
]) {
  constructor(firstLoginDto: FirstLoginDto) {
    super(FirstLoginDto);
    this.preferredRegion = firstLoginDto.preferredRegion;
    this.preferredCompanion = firstLoginDto.preferredCompanion;
    this.budgetStyle = firstLoginDto.budgetStyle;
    this.planningStyle = firstLoginDto.planningStyle;
    this.scheduleStyle = firstLoginDto.scheduleStyle;
    this.destinationStyle1 = firstLoginDto.destinationStyle1;
    this.destinationStyle2 = firstLoginDto.destinationStyle2;
    this.destinationStyle3 = firstLoginDto.destinationStyle3;
  }
}
