import {
  TCreateOrder,
  TOrderReturn,
  TReturnCreateOrder,
} from "../interface/order.interface";

import orderRepository from "../database/repository/order.repository";

class OrderService {
  async createOrder(data: TCreateOrder) {
    return await orderRepository.create(data);
  }

  async findAll() {
    return await orderRepository.findAll();
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
