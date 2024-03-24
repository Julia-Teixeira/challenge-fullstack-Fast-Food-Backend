import { Prisma } from "@prisma/client";
import z from "zod";

export const additionalSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.instanceof(Prisma.Decimal),
  imgCover: z.string(),
  type: z.enum(["ingredient", "souce", "drink"]),
  description: z.string().nullish(),
  createdAt: z.date(),
});

export const createAdditionalSchema = additionalSchema.omit({
  id: true,
  createdAt: true,
});
