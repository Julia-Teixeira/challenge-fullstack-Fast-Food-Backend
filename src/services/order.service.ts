import { PrismaClient } from "@prisma/client";
import prisma from "../database/prisma";
import { TCreateOrder } from "../interface/order.interface";
import AppError from "../error/app.error";

class OrderService {
  private repository: PrismaClient = prisma;

  async createOrder(data: TCreateOrder) {
    const productOrder = data.productOrder;
    const productsOrderObject = await Promise.all(
      productOrder.map(async (id: number) => {
        const productOrder = await this.repository.productOrder.findUnique({
          where: { id },
          include: {
            product: { select: { id: true, price: true } },
            additionalIds: true,
          },
        });
        return {
          id,
          amount: productOrder!.amount,
          total: productOrder!.total,
          productPrice: productOrder!.product.price,
          totalAdditionals: productOrder!.additionalIds.reduce(
            (acc, curr) => acc + Number(curr.price),
            0,
          ),
        };
      }),
    );
    const TOTAL = productsOrderObject.reduce(
      (acc, curr) => acc + (Number(curr.productPrice) + curr.totalAdditionals),
      0,
    );

    if (TOTAL !== data.total) {
      throw new AppError(
        "Total do pedido não confere, o total deve ser igual a: " + TOTAL,
        400,
      );
    }

    if (data.payment.total < TOTAL) {
      throw new AppError(
        "Total do pagamento do pedido é menor que o esperado, o total deve ser maior ou igual a: " +
          TOTAL,
      );
    }

    if (data.payment.total > TOTAL) {
      const change = data.payment.total - TOTAL;

      if (data.payment.change !== change) {
        throw new AppError(
          "O troco do pedido é diferente do que o esperado, o troco deve ser igual a: " +
            change,
        );
      }
    }

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

  async findOne(id: number) {
    const order = await this.repository.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        code: true,
        nameCostumer: true,
        createdAt: true,
        total: true,
        payment: {
          select: {
            id: true,
            type: true,
            change: true,
            total: true,
          },
        },
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
                price: true,
              },
            },
            product: {
              select: {
                id: true,
                name: true,
                imgCover: true,
                price: true,
              },
            },
          },
        },
      },
    });
    return order;
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
