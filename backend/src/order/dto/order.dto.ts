import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  film: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsNumber()
  @Min(1)
  row: number;

  @IsNumber()
  @Min(1)
  seat: number;

  @IsNumber()
  price: number;

  @IsString()
  daytime: string;
}

export class CreateFullOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDto)
  tickets: CreateOrderDto[];
}

export class CreateOrderWithIdDto extends CreateOrderDto {
  id: string;
}

export class OrderResponseDto {
  total: number;
  items: CreateOrderWithIdDto[];
}
