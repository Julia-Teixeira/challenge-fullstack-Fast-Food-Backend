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

  async deleteProductOrder(request: Request, response: Response) {
    const { id } = request.params;
    await productOrderService.deleteProductOrder(Number(id));
    return response.status(204).send();
  }
}
const productOrderController = new ProductOrderController();
export default productOrderController;
