import z from "zod";
import { additionalSchema } from "../schema/additionals.schema";

export type TAdditional = z.infer<typeof additionalSchema>;
export type TCreateAdditional = Omit<TAdditional, "id" | "createdAt">;
