// src/dto/material.dto.ts
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class MaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  lossPercent: number;
}
