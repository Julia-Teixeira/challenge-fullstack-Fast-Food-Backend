import { Request, Response } from "express";
import OrderService from "../services/order.service";

const orderService = new OrderService();

class OrderController {
  async createOrder(request: Request, response: Response) {
    const order = await orderService.createOrder(request.body);
    return response.status(201).json(order);
  }
  async getAllOrders(request: Request, response: Response) {
    const options = {
      page: Number(request.query.page) || 1,
      perPage: Number(request.query.perPage) || 30,
    };
    const query = request.query.status as
      | "onGoing"
      | "finished"
      | "delivered"
      | undefined;

    const orders = await orderService.findAll(options, query);
    return response.json(orders).status(200);
  }

  async getOrderById(request: Request, response: Response) {
    const { id } = request.params;
    const order = await orderService.findOne(Number(id));
    return response.json(order).status(200);
  }

  async updateOrder(request: Request, response: Response) {
    const { id } = request.params;
    const { status } = request.body;
    const order = await orderService.alterOrderStatus(Number(id), status);
    return response.json(order).status(200);
  }

  async deleteOrder(request: Request, response: Response) {
    const { id } = request.params;
    await orderService.deleteOrder(Number(id));
    return response.status(204).send();
  }
}

export default new OrderController();
