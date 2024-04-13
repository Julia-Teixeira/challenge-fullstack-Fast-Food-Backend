import { TCategory, TCreateCategory } from "./category.interface";
import { PaginateOptions, TPaginatedResult } from "./pagination.interface";
import {
  TCreateProduct,
  TProduct,
  TProductReturnById,
} from "./product.interface";

export interface TProductRepository {
  create(data: TCreateProduct): Promise<TProduct>;
  findAll(
    category?: string,
    options?: PaginateOptions,
  ): Promise<TPaginatedResult<TProduct>>;
  findById(id: number): Promise<TProductReturnById>;
}

export interface TCategoryRepository {
  create(data: TCreateCategory): Promise<TCategory>;
  findAll(): Promise<TPaginatedResult<TCategory>>;
}
