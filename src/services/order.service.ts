import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";

class OrderService {
  private repository: PrismaClient = prisma;

  async createOrder(data: any) {
    const order = await this.repository.order.create({
      data: {
        status: "onGoing",
        code: data.code,
        nameCostumer: data.nameCostumer,
        total: data.total,
        productOrder: {
          connect: { id: data.productOrder },
        },
      },
    });

    const payment = await this.repository.payment.create({
      data: {
        type: data.payment.type,
        change: data.payment.change,
        total: data.payment.total,
        orderId: order.id,
      },
    });

    await this.repository.order.update({
      where: {
        id: order.id,
      },
      data: {
        payment: {
          connect: {
            id: payment.id,
          },
        },
      },
    });

    return order;
  }
}

export default OrderService;
