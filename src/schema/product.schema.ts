import { Prisma } from "@prisma/client";
import z from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().or(z.instanceof(Prisma.Decimal)),
  description: z.string().nullish(),
  imgCover: z.string(),
  categoryId: z.number(),
  createdAt: z.date(),
});

export const createProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
});
