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
      },
    });

    for (const productOrder of data.productOrder) {
      await this.repository.order.update({
        where: {
          id: order.id,
        },
        data: {
          productOrder: {
            connect: {
              id: productOrder,
            },
          },
        },
      });
      await this.repository.productOrder.update({
        where: {
          id: productOrder,
        },
        data: {
          Order: {
            connect: {
              id: order.id,
            },
          },
        },
      });
    }

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

  async findAll() {
    const orders = await this.repository.order.findMany({
      select: {
        id: true,
        status: true,
        code: true,
        nameCostumer: true,
        createdAt: true,
        productOrder: {
          select: {
            id: true,
            amount: true,
            note: true,
            additionalIds: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            product: {
              select: {
                id: true,
                name: true,
                imgCover: true,
              },
            },
          },
        },
      },
    });
    return orders;
  }
  async alterOrderStatus(id: number, status: "onGoing" | "finished") {
    const order = await this.repository.order.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });
    return order;
  }

  async deleteOrder(id: number) {
    await this.repository.order.delete({
      where: {
        id,
      },
    });
    return null;
  }
}

export default OrderService;
