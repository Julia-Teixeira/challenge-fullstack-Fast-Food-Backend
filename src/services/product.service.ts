import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";
import {
  PaginateOptions,
  TCreateProduct,
  TPaginatedResult,
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

  async findAll(
    category?: string,
    options?: PaginateOptions,
  ): Promise<TPaginatedResult> {
    const page = Number(options?.page) || 1;
    const perPage = Number(options?.perPage) || 10;
    const skip = page > 0 ? perPage * (page - 1) : 0;
    let products;
    if (category) {
      products = await this.repository.product.findMany({
        where: {
          category: { name: { equals: category, mode: "insensitive" } },
        },
        skip,
        take: perPage,
        orderBy: {
          id: "asc",
        },
      });
    } else {
      products = await this.repository.product.findMany({
        skip,
        take: perPage,
        orderBy: {
          id: "asc",
        },
      });
    }
    const totalProduts = await this.repository.product.count();
    const lastPage = Math.ceil(totalProduts / perPage);

    const response = {
      totalProduts,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
      products,
    };

    return response;
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
