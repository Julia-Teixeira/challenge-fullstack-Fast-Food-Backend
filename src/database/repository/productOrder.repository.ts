import { PrismaClient } from "@prisma/client";
import { TProductOrder } from "../../interface/repository.interface";
import prisma from "./prisma.repository";
import { TProductOrder as TCreateProductOrder } from "../../interface/productOrder.interface";
import AppError from "../../error/app.error";

class ProductOrderRepository implements TProductOrder {
  private repository: PrismaClient = prisma;

  async create(data: TCreateProductOrder) {
    let productOrder;

    if (!data.additionalIds) {
      productOrder = await this.repository.productOrder.create({
        data: {
          note: data.note ? data.note : "",
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
          note: data.note ? data.note : "",
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

  async delete(id: number) {
    const productOrder = await this.repository.productOrder.findUnique({
      where: {
        id,
      },
    });
    if (!productOrder) {
      throw new AppError("ProductOrder not found", 404);
    }
    await this.repository.productOrder.delete({
      where: {
        id,
      },
    });
    return;
  }
}

const productOrderRepository = new ProductOrderRepository();

export default productOrderRepository;
