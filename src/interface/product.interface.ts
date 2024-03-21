import z from "zod";
import ProductSchema from "../schema/product.schema";

type TProduct = z.infer<typeof ProductSchema.productSchema>;

interface TProductReturnById extends TProduct {
  additionalIds: number[];
}

interface TProductService {
  findAll: () => Promise<TProduct[]>;
  findProductById: (id: number) => Promise<TProductReturnById>;
}

export { TProduct, TProductService, TProductReturnById };
