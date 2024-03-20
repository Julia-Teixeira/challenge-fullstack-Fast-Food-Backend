import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";
import { TProduct, TProductReturnById } from "../interface/product.interface";

class ProductService {
  private repository: PrismaClient = prisma;

  async findAll(): Promise<TProduct[]> {
    const products = await this.repository.product.findMany({});
    return products;
  }

  async findProductById(id: number): Promise<TProductReturnById> {
    const product = await this.repository.product.findUnique({
      where: { id },
    });
    return product as unknown as TProductReturnById;
  }
}

export default ProductService;
