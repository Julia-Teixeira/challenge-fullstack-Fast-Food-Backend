import z from "zod";
import { orderSchema, createOrderSchema } from "../schema/order.schema";

export type TOrder = z.infer<typeof orderSchema>;
export type TCreateOrder = z.infer<typeof createOrderSchema>;
