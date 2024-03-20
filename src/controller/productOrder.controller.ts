import { Request, Response } from "express";
import ProductOrderService from "../services/productOrder.service";

const productOrderService = new ProductOrderService();

class ProductOrderController {
  async createProductOrder(request: Request, response: Response) {
    const productOrder = await productOrderService.createProductOrder(
      request.body,
    );
    return response.json(productOrder).status(201);
  }
}
const productOrderController = new ProductOrderController();
export default productOrderController;
