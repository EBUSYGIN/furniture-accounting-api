// src/entitites/material.entity.ts
import { injectable } from 'inversify';

@injectable()
export class MaterialEntity {
  name: string;
  lossPercent: number;

  constructor(name: string, lossPercent: number) {
    this.name = name;
    this.lossPercent = lossPercent;
  }

  toCreateData() {
    return {
      name: this.name,
      lossPercent: this.lossPercent,
    };
  }

  toUpdateData() {
    return {
      name: this.name,
      lossPercent: this.lossPercent,
    };
  }
}
