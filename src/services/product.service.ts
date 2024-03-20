import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";
import { TProduct, TProductReturnById } from "../interface/product.interface";

class ProductService {
  private contactRepository: PrismaClient = prisma;

  async findAll(): Promise<TProduct[]> {
    const products = await this.contactRepository.product.findMany({});
    return products;
  }

  async findProductById(id: number): Promise<TProductReturnById> {
    const product = await this.contactRepository.product.findUnique({
      where: { id },
      include: { additionalIds: true },
    });
    return product as unknown as TProductReturnById;
  }
}

export default ProductService;
