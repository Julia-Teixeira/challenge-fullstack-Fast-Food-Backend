import z from "zod";
import { productSchema } from "../schema/product.schema";

type TProduct = z.infer<typeof productSchema>;
interface TPaginatedResult {
  totalProduts: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
  products: TProduct[];
}

type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};

interface TProductReturnById extends TProduct {
  additionalIds: number[];
}

type TCreateProduct = Omit<TProduct, "id" | "createdAt">;

export {
  TProduct,
  TProductReturnById,
  TCreateProduct,
  TPaginatedResult,
  PaginateOptions,
};
