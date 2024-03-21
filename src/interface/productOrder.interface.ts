import z from "zod";
import ProductOrderSchema from "../schema/productOrder.schema";

type TProductOrder = z.infer<typeof ProductOrderSchema.productOrderSchema>;

export { TProductOrder };
