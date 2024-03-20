import { Request, Response } from "express";
import OrderService from "../services/order.service";

const orderService = new OrderService();

class OrderController {
  async createOrder(request: Request, response: Response) {
    const order = await orderService.createOrder(request.body);
    return response.json(order).status(201);
  }
  async getAllOrders(request: Request, response: Response) {
    const orders = await orderService.findAll();
    return response.json(orders).status(200);
  }
}

export default new OrderController();
