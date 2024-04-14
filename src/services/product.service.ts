import {
  TCreateProduct,
  TProduct,
  TProductReturnById,
} from "../interface/product.interface";
import { productRepository } from "../database/";
import {
  PaginateOptions,
  TPaginatedResult,
} from "../interface/pagination.interface";

class ProductService {
  async createProduct(data: TCreateProduct) {
    return await productRepository.create(data);
  }

  async findAll(
    category?: string,
    options?: PaginateOptions,
    name?: string,
  ): Promise<TPaginatedResult<TProduct>> {
    return await productRepository.findAll(category, options, name);
  }

  async findProductById(id: number): Promise<TProductReturnById> {
    return await productRepository.findById(id);
  }
}

export default ProductService;
