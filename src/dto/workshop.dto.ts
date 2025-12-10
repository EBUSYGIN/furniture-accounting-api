import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class WorkshopDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInt()
  @IsPositive()
  workers: number;
}
