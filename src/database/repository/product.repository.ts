import { TProductRepository } from "./../../interface/repository.interface";
import {
  TCreateProduct,
  TProduct,
  TProductReturnById,
} from "../../interface/product.interface";
import { prisma } from "../index";
import { PrismaClient } from "@prisma/client";
import {
  PaginateOptions,
  TPaginatedResult,
} from "../../interface/pagination.interface";
class ProductRepository implements TProductRepository {
  private repository: PrismaClient = prisma;

  async create(data: TCreateProduct): Promise<TProduct> {
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
  ): Promise<TPaginatedResult<TProduct>> {
    const page = Number(options?.page) || 1;
    const perPage = Number(options?.perPage) || 20;
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
      total: totalProduts,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
      data: products,
    };

    return response;
  }

  async findById(id: number): Promise<TProductReturnById> {
    const product = await this.repository.product.findUnique({
      where: { id },
    });
    return product as unknown as TProductReturnById;
  }
}

const productRepository = new ProductRepository();

export default productRepository;
