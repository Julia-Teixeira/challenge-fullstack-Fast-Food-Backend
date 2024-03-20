import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";

class ProductService {
  private contactRepository: PrismaClient = prisma;

  async findAll() {
    const products = await this.contactRepository.product.findMany();
    return products;
  }
}

export default ProductService;
