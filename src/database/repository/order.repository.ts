import { PrismaClient } from "@prisma/client";
import { TOrderRepository } from "../../interface/repository.interface";
import prisma from "./prisma.repository";
import {
  TCreateOrder,
  TOrderReturn,
  TReturnCreateOrder,
} from "../../interface/order.interface";
import AppError from "../../error/app.error";
import {
  PaginateOptions,
  TPaginatedResult,
} from "../../interface/pagination.interface";

class OrderRepository implements TOrderRepository {
  private repository: PrismaClient = prisma;

  async create(data: TCreateOrder): Promise<TReturnCreateOrder> {
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
      (acc, curr) =>
        acc + (Number(curr.productPrice) * curr.amount + curr.totalAdditionals),
      0,
    );

    if (TOTAL !== data.total) {
      throw new AppError(
        "Total do pedido não confere, o total deve ser igual a: " + TOTAL,
        400,
      );
    }

    if (Number(data.payment.total) < TOTAL) {
      throw new AppError(
        "Total do pagamento do pedido é menor que o esperado, o total deve ser maior ou igual a: " +
          TOTAL,
      );
    }

    if (Number(data.payment.total) > TOTAL) {
      const change = Number(data.payment.total) - TOTAL;

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

  async findAll(
    options?: PaginateOptions,
    status?: "onGoing" | "finished" | "delivered",
  ): Promise<TPaginatedResult<TOrderReturn>> {
    const query = status ? status : undefined;
    const page = Number(options?.page) || 1;
    const perPage = Number(options?.perPage) || 20;
    const skip = page > 0 ? perPage * (page - 1) : 0;

    let orders;

    if (!query) {
      orders = await this.repository.order.findMany({
        skip,
        take: perPage,
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          status: true,
          code: true,
          nameCostumer: true,
          total: true,
          createdAt: true,
          productOrder: {
            select: {
              id: true,
              amount: true,
              note: true,
              total: true,
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
          payment: {
            select: {
              type: true,
              change: true,
              total: true,
            },
          },
        },
      });
    } else {
      orders = await this.repository.order.findMany({
        skip,
        take: perPage,
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          status: true,
          code: true,
          nameCostumer: true,
          total: true,
          createdAt: true,
          productOrder: {
            select: {
              id: true,
              amount: true,
              note: true,
              total: true,
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
          payment: {
            select: {
              type: true,
              change: true,
              total: true,
            },
          },
        },
        where: {
          status: query,
        },
      });
    }

    const totalOrders = await this.repository.order.count();
    const lastPage = Math.ceil(totalOrders / perPage);
    const response = {
      total: totalOrders,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
      data: orders,
    };

    return response;
  }

  async findOne(id: number): Promise<TOrderReturn> {
    const order = await this.repository.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        code: true,
        nameCostumer: true,
        total: true,
        createdAt: true,
        productOrder: {
          select: {
            id: true,
            amount: true,
            note: true,
            total: true,
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
        payment: {
          select: {
            type: true,
            change: true,
            total: true,
          },
        },
      },
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return order;
  }

  async alterStatus(
    id: number,
    status: "onGoing" | "finished",
  ): Promise<TReturnCreateOrder> {
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

  async delete(id: number): Promise<void> {
    await this.repository.order.delete({
      where: {
        id,
      },
    });
    return;
  }
}

const orderRepository = new OrderRepository();

export default orderRepository;
