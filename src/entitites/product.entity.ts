// entitites/product.entity.ts
export class ProductEntity {
  name: string;
  typeId: number;
  materialId: number;
  minPrice: number;

  constructor(
    name: string,
    typeId: number,
    materialId: number,
    minPrice: number
  ) {
    this.name = name;
    this.typeId = typeId;
    this.materialId = materialId;
    this.minPrice = minPrice;
  }

  toCreateData(article: string) {
    return {
      name: this.name,
      article,
      typeId: this.typeId,
      materialId: this.materialId,
      minPrice: this.minPrice,
    };
  }

  toUpdateData() {
    return {
      name: this.name,
      typeId: this.typeId,
      materialId: this.materialId,
      minPrice: this.minPrice,
    };
  }
}
