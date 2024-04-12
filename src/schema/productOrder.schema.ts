import z from "zod";

export const productOrderSchema = z.object({
  productId: z.number(),
  amount: z.number(),
  note: z.string().nullish(),
  total: z.number(),
  orderId: z.number().nullish(),
  additionalIds: z.any().nullish(),
});
