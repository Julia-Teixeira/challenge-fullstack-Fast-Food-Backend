import z from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  imgCover: z.string(),
  createdAt: z.date(),
});

export const createCategorySchema = categorySchema.omit({
  id: true,
  createdAt: true,
});
