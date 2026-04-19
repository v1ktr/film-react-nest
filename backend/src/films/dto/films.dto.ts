import {
  IsString,
  IsNumber,
  IsArray,
  IsInt,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilmDto {
  @IsString()
  id: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;
}

export class FilmsResponseDto {
  @IsNumber()
  @Min(0)
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilmDto)
  items: FilmDto[];
}

export class ScheduleDto {
  @IsString()
  id: string;

  @IsString()
  daytime: string;

  @IsInt()
  hall: number;

  @IsInt()
  rows: number;

  @IsInt()
  seats: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsString({ each: true })
  taken: string[];
}

export class ScheduleResponseDto {
  @IsNumber()
  @Min(0)
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  items: ScheduleDto[];
}
