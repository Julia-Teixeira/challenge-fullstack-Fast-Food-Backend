import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";
import {
  TCreateProduct,
  TProduct,
  TProductReturnById,
} from "../interface/product.interface";

class ProductService {
  private repository: PrismaClient = prisma;

  async createProduct(data: TCreateProduct) {
    const product: TProduct = await this.repository.product.create({
      data: {
        name: data.name,
        price: data.price,
        imgCover: data.imgCover,
        description: data.description ? data.description : null,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
      },
    });
    return product;
  }

  async findAll(category?: string): Promise<TProduct[]> {
    let products;
    if (category) {
      products = await this.repository.product.findMany({
        where: {
          category: { name: { equals: category, mode: "insensitive" } },
        },
        skip: 0,
        take: 20,
      });
    } else {
      products = await this.repository.product.findMany({
        skip: 0,
        take: 20,
      });
    }

    console.log(products);
    return products;
  }

  async findProductById(id: number): Promise<TProductReturnById> {
    const product = await this.repository.product.findUnique({
      where: { id },
    });
    return product as unknown as TProductReturnById;
  }

  async findAllAdditional() {
    const additional = await this.repository.additional.findMany();
    return additional;
  }
}

export default ProductService;
