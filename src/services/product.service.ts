import {
  PaginateOptions,
  TCreateProduct,
  TPaginatedResult,
  TProductReturnById,
} from "../interface/product.interface";
import { productRepository } from "../database/";

class ProductService {
  async createProduct(data: TCreateProduct) {
    return await productRepository.create(data);
  }

  async findAll(
    category?: string,
    options?: PaginateOptions,
  ): Promise<TPaginatedResult> {
    return await productRepository.findAll(category, options);
  }

  async findProductById(id: number): Promise<TProductReturnById> {
    return await productRepository.findById(id);
  }
}

export default ProductService;
