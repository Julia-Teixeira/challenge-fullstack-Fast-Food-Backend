import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";

class CategoriesService {
  private repository: PrismaClient = prisma;

  async findAll() {
    const categories = await this.repository.category.findMany({
      include: {
        product: true,
      },
    });
    return categories;
  }
}

export default new CategoriesService();
