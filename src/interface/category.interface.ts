import z from "zod";
import { categorySchema } from "../schema/category.schema";

export type TCategory = z.infer<typeof categorySchema>;
export type TCreateCategory = Omit<TCategory, "id" | "createdAt">;
