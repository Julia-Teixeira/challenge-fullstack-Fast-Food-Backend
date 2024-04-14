import { TProductOrder } from "../interface/productOrder.interface";
import { productOrderRepository } from "../database";

class ProductOrderService {
  async createProductOrder(data: TProductOrder) {
    return await productOrderRepository.create(data);
  }

  async deleteProductOrder(id: number) {
    return await productOrderRepository.delete(id);
  }
}

export default ProductOrderService;
