import { TAdditional } from "./additional.interface";
import {
  PaginateOptions,
  TCreateProduct,
  TPaginatedResult,
  TProduct,
  TProductReturnById,
} from "./product.interface";

export interface TProductRepository {
  createProduct(data: TCreateProduct): Promise<TProduct>;
  findAll(
    category?: string,
    options?: PaginateOptions,
  ): Promise<TPaginatedResult>;
  findById(id: number): Promise<TProductReturnById>;
  findAdditional(): Promise<TAdditional[]>;
}
