import { PrismaClient } from "@prisma/client";
import { prisma } from "../index";
import { TCategory, TCreateCategory } from "../../interface/category.interface";
import { TCategoryRepository } from "../../interface/repository.interface";
import {
  PaginateOptions,
  TPaginatedResult,
} from "../../interface/pagination.interface";

class CategotyRepository implements TCategoryRepository {
  private repository: PrismaClient = prisma;

  async create(data: TCreateCategory): Promise<TCategory> {
    const category: TCategory = await this.repository.category.create({
      data: {
        name: data.name,
        imgCover: data.imgCover,
      },
    });
    return category;
  }

  async findAll(
    options?: PaginateOptions,
  ): Promise<TPaginatedResult<TCategory>> {
    const page = Number(options?.page) || 1;
    const perPage = Number(options?.perPage) || 20;
    const skip = page > 0 ? perPage * (page - 1) : 0;
    const categories: TCategory[] = await this.repository.category.findMany({
      include: {
        product: true,
      },
      skip,
      take: perPage,
    });

    const totalCategories = await this.repository.category.count();
    const lastPage = Math.ceil(totalCategories / perPage);

    const response = {
      total: totalCategories,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
      data: categories,
    };
    return response;
  }
}

const categoryRepository = new CategotyRepository();

export default categoryRepository;
