import z from "zod";
import { productOrderSchema } from "../schema/productOrder.schema";

type TProductOrder = z.infer<typeof productOrderSchema>;

export { TProductOrder };
