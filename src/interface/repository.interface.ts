import { TAdditional, TCreateAdditional } from "./additional.interface";
import { TCategory, TCreateCategory } from "./category.interface";
import {
  TCreateOrder,
  TOrder,
  TOrderReturn,
  TReturnCreateOrder,
} from "./order.interface";
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

export interface TOrderRepository {
  create(data: TCreateOrder): Promise<TReturnCreateOrder>;
  findAll(): Promise<TOrderReturn[]>;
  findOne(id: number): Promise<TOrderReturn>;
  alterStatus(
    id: number,
    status: "onGoing" | "finished",
  ): Promise<TReturnCreateOrder>;
  delete(id: number): Promise<void>;
}
