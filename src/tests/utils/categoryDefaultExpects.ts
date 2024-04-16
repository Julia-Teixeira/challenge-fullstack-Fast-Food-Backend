import { expect } from "vitest";
import { TCreateCategory } from "../../interface/category.interface";

export const categoryDefaultExpects = async (category: TCreateCategory) => {
  expect(category).toBeDefined();
  expect(category).toBeTypeOf("object");

  expect(category.name).toBeDefined();
  expect(category.name).toBeTypeOf("string");

  expect(category.imgCover).toBeDefined();
  expect(category.imgCover).toBeTypeOf("string");
};
