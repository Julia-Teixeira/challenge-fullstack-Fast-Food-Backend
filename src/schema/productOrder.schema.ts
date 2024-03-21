import z from "zod";

const productOrderSchema = z.object({
  productId: z.number(),
  amount: z.number(),
  note: z.string(),
  total: z.number(),
  orderId: z.number().nullish(),
  additionalIds: z.any().nullish(),
});

export default { productOrderSchema };
