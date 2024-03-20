import { Request, Response } from "express";
import OrderService from "../services/order.service";

const orderService = new OrderService();

class OrderController {
  async createOrder(request: Request, response: Response) {
    const order = await orderService.createOrder(request.body);
    return response.json(order).status(201);
  }
}

export default new OrderController();
