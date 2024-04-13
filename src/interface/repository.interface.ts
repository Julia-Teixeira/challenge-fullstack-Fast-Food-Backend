import { TAdditional, TCreateAdditional } from "./additional.interface";
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
  findAll(options?: PaginateOptions): Promise<TPaginatedResult<TCategory>>;
}

export interface TAdditionalRepository {
  create(data: TCreateAdditional): Promise<TAdditional>;
  findAll(options?: PaginateOptions): Promise<TPaginatedResult<TAdditional>>;
}
