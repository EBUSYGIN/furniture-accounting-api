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

  @IsInt()
  @IsPositive()
  typeId: number;

  @IsInt()
  @IsPositive()
  materialId: number;

  @IsNumber()
  @IsPositive()
  minPrice: number;
}
