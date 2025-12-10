import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class ProductWorkshopDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  workshopId: number;

  @IsNumber()
  @IsPositive()
  productionTime: number;
}
