import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";
import {
  TAdditional,
  TCreateAdditional,
} from "../interface/additional.interface";

class AdditionalsService {
  private repository: PrismaClient = prisma;

  async create(data: TCreateAdditional) {
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

  async findAll() {
    const additionals: TAdditional[] =
      await this.repository.additional.findMany();
    return additionals;
  }
}

export default new AdditionalsService();
