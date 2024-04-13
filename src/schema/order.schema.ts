import { Prisma } from "@prisma/client";
import z from "zod";

export const orderSchema = z.object({
  id: z.number(),
  nameCostumer: z.string(),
  code: z.number(),
  productOrder: z.array(z.number()),
  createdAt: z.date(),
  total: z.number().or(z.instanceof(Prisma.Decimal)),
});

const payment = z.object({
  type: z.enum(["debit", "credit", "inCash"]),
  change: z.number().or(z.instanceof(Prisma.Decimal)),
  total: z.number().or(z.instanceof(Prisma.Decimal)),
});

export const createOrderSchema = orderSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    payment: payment,
  });

export const returnCreateOrder = orderSchema.omit({
  productOrder: true,
  status: z.enum(["onGoing", "finished", "delivered"]),
});

const additional = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  price: z.number().or(z.instanceof(Prisma.Decimal)),
});

const product = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().or(z.instanceof(Prisma.Decimal)),
  imgCover: z.string(),
});

export const returnAllOrderSchema = z.object({
  id: z.number(),
  status: z.enum(["onGoing", "finished", "delivered"]),
  code: z.number(),
  nameCostumer: z.string(),
  total: z.number().or(z.instanceof(Prisma.Decimal)),
  createdAt: z.date(),
  productOrder: z.array(
    z.object({
      id: z.number(),
      amount: z.number(),
      note: z.string().nullish(),
      total: z.number().or(z.instanceof(Prisma.Decimal)),
      additionalIds: z.array(additional).nullish(),
      product: product,
    }),
  ),
  payment: z.array(payment),
});
