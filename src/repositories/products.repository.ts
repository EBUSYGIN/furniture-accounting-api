import { inject, injectable } from 'inversify';
import { IConfigService } from '../common/env/config.service.interface';
import { TYPES } from '../common/config.di';
import { IProductsRepository } from './products.interface';
import { PrismaService } from '../common/database/prisma.service';

@injectable()
export class ProductsRepository implements IProductsRepository {
  private prismaService: PrismaService;
  constructor(@inject(TYPES.PrismaService) prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getAllProducts() {
    return this.prismaService.client.product.findMany();
  }

  async getProductById(id: number) {
    // TODO: вернуть одно изделие по id
  }

  async getProductByArticle(article: string) {
    // TODO: вернуть одно изделие по артикулу
  }

  async createProduct(data: any) {
    // TODO: добавить новое изделие
  }

  async updateProduct(id: number, data: any) {
    // TODO: изменить данные изделия
  }

  async deleteProduct(id: number) {
    // TODO: удалить изделие
  }

  async getProductsByType(typeId: number) {
    // TODO: изделия по типу мебели
  }

  async getProductsByMaterial(materialId: number) {
    // TODO: изделия по материалу
  }
}
