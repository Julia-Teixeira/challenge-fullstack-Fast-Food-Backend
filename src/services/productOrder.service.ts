import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";
import { TProductOrder } from "../interface/productOrder.interface";

class ProductOrderService {
  private repository: PrismaClient = prisma;

  async createProductOrder(data: TProductOrder) {
    let productOrder;

    if (!data.additionalIds) {
      productOrder = await this.repository.productOrder.create({
        data: {
          note: data.note,
          amount: data.amount,
          total: data.total,
          product: {
            connect: { id: Number(data.productId) },
          },
        },
        include: {
          additionalIds: true,
        },
      });
    } else {
      productOrder = await this.repository.productOrder.create({
        data: {
          note: data.note,
          amount: data.amount,
          total: data.total,
          product: {
            connect: { id: Number(data.productId) },
          },
          additionalIds: {
            connect: data.additionalIds.map((id: number) => ({
              id: Number(id),
            })),
          },
        },
        include: {
          additionalIds: true,
        },
      });
    }

    return productOrder;
  }

  async deleteProductOrder(id: number) {
    await this.repository.productOrder.delete({
      where: {
        id,
      },
    });
    return null;
  }
}

export default ProductOrderService;
