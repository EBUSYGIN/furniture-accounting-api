import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  typeId: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  materialId: number;

  @IsNumber()
  @IsPositive()
  minPrice: number;
}
