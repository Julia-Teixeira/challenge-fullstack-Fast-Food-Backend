import z from "zod";

export const orderSchema = z.object({
  id: z.number(),
  nameCostumer: z.string(),
  code: z.number(),
  productOrder: z.array(z.number()),
  createdAt: z.date(),
  total: z.number(),
});

const payment = z.object({
  type: z.enum(["debit", "credit", "inCash"]),
  change: z.number(),
  total: z.number(),
});

export const createOrderSchema = orderSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    payment: payment,
  });
