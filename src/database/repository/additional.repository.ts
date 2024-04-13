import { PrismaClient } from "@prisma/client";
import prisma from "./prisma.repository";
import {
  TAdditional,
  TCreateAdditional,
} from "../../interface/additional.interface";
import {
  PaginateOptions,
  TPaginatedResult,
} from "../../interface/pagination.interface";
import AppError from "../../error/app.error";

class AdditionalRepository {
  private repository: PrismaClient = prisma;

  async create(data: TCreateAdditional): Promise<TAdditional> {
    const searchAdditional = await this.repository.additional.findFirst({
      where: {
        name: data.name,
      },
    });

    if (searchAdditional) {
      throw new AppError("Additional already exists", 409);
    }

    const additional: TAdditional = await this.repository.additional.create({
      data: {
        name: data.name,
        price: data.price,
        imgCover: data.imgCover,
        description: data.description ? data.description : null,
        type: data.type,
      },
    });
    return additional;
  }

  async findAll(
    options?: PaginateOptions,
  ): Promise<TPaginatedResult<TAdditional>> {
    const page = Number(options?.page) || 1;
    const perPage = Number(options?.perPage) || 20;
    const skip = page > 0 ? perPage * (page - 1) : 0;

    const additionals: TAdditional[] =
      await this.repository.additional.findMany({
        skip,
        take: perPage,
      });

    const totalAdditionals = await this.repository.additional.count();
    const lastPage = Math.ceil(totalAdditionals / perPage);
    const response = {
      total: totalAdditionals,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
      data: additionals,
    };

    return response;
  }
}

const additionalRepository = new AdditionalRepository();

export default additionalRepository;
