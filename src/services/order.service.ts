import {
  TCreateOrder,
  TOrderReturn,
  TReturnCreateOrder,
} from "../interface/order.interface";

import { orderRepository } from "../database/";
import {
  PaginateOptions,
  TPaginatedResult,
} from "../interface/pagination.interface";

class OrderService {
  async createOrder(data: TCreateOrder) {
    return await orderRepository.create(data);
  }

  async findAll(
    options?: PaginateOptions,
    status?: "onGoing" | "finished" | "delivered",
  ): Promise<TPaginatedResult<TOrderReturn>> {
    return await orderRepository.findAll(options, status);
  }

  async findOne(id: number): Promise<TOrderReturn> {
    return await orderRepository.findOne(id);
  }

  async alterOrderStatus(
    id: number,
    status: "onGoing" | "finished",
  ): Promise<TReturnCreateOrder> {
    return await orderRepository.alterStatus(id, status);
  }

  async deleteOrder(id: number): Promise<void> {
    return await orderRepository.delete(id);
  }
}

export default OrderService;
