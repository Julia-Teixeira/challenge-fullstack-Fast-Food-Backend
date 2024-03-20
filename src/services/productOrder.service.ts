import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";
import { TProductOrder } from "../interface/productOrder.interface";

class ProductOrderService {
  private contactRepository: PrismaClient = prisma;

  async createProductOrder(data: TProductOrder) {
    let productOrder;

    if (!data.additionalIds) {
      productOrder = await this.contactRepository.productOrder.create({
        data: {
          note: data.note,
          amount: data.amount,
          total: data.total,
          product: {
            connect: { id: Number(data.productId) },
          },
        },
      });
    } else {
      productOrder = await this.contactRepository.productOrder.create({
        data: {
          note: data.note,
          amount: data.amount,
          total: data.total,
          additionalIds: data.additionalIds ? data.additionalIds : null,
          product: {
            connect: { id: Number(data.productId) },
          },
        },
      });
    }

    return productOrder;
  }
}

export default ProductOrderService;
