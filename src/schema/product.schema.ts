import { Prisma } from "@prisma/client";
import z from "zod";

const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.instanceof(Prisma.Decimal),
  description: z.string().nullish(),
  imgCover: z.string(),
  categoryId: z.number(),
  createdAt: z.date(),
});

export default { productSchema };
