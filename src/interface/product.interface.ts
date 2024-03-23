import z from "zod";
import ProductSchema from "../schema/product.schema";

type TProduct = z.infer<typeof ProductSchema.productSchema>;

interface TProductReturnById extends TProduct {
  additionalIds: number[];
}

export { TProduct, TProductReturnById };
