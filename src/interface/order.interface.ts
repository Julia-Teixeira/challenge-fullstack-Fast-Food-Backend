import z from "zod";
import {
  orderSchema,
  createOrderSchema,
  returnAllOrderSchema,
  returnCreateOrder,
} from "../schema/order.schema";

export type TOrder = z.infer<typeof orderSchema>;
export type TCreateOrder = z.infer<typeof createOrderSchema>;
export type TReturnCreateOrder = z.infer<typeof returnCreateOrder>;
export type TOrderReturn = z.infer<typeof returnAllOrderSchema>;
