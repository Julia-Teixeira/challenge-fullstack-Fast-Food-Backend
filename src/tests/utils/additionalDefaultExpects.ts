import { expect } from "vitest";
import { TAdditional } from "../../interface/additional.interface";

export const additionalDefaultExpects = async (additional: TAdditional) => {
  expect(additional).toBeDefined();
  expect(additional).toBeTypeOf("object");

  expect(additional.id).toBeDefined();
  expect(additional.id).toBeTypeOf("number");

  expect(additional.name).toBeDefined();
  expect(additional.name).toBeTypeOf("string");

  expect(additional.price).toBeDefined();
  expect(additional.price).toBeTypeOf("string");

  expect(additional.type).toBeDefined();
  expect(additional.type).toBeTypeOf("string");

  expect(additional.description).toBeDefined();
  expect(additional.description).toBeTypeOf("string");

  expect(additional.imgCover).toBeDefined();
  expect(additional.imgCover).toBeTypeOf("string");

  expect(additional.createdAt).toBeDefined();
  expect(additional.createdAt).toBeTypeOf("string");
};
