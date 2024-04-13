import z from "zod";
import { productSchema } from "../schema/product.schema";

type TProduct = z.infer<typeof productSchema>;

interface TProductReturnById extends TProduct {
  additionalIds: number[];
}

type TCreateProduct = Omit<TProduct, "id" | "createdAt">;

export { TProduct, TProductReturnById, TCreateProduct };
