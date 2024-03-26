import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";
import { TCategory, TCreateCategory } from "../interface/category.interface";

class CategoriesService {
  private repository: PrismaClient = prisma;

  async createCategory(data: TCreateCategory) {
    const category: TCategory = await this.repository.category.create({
      data: {
        name: data.name,
        imgCover: data.imgCover,
      },
    });
    return category;
  }

  async findAll() {
    const categories: TCategory[] = await this.repository.category.findMany({
      include: {
        product: true,
      },
    });
    return categories;
  }
}

export default new CategoriesService();
