import { describe, expect, it } from "vitest";
import { request } from "../../setupFiles";
import {
  productBodyInvalid,
  productInvalidCategory,
  productValid,
} from "../../mocks/product.mock";
import { categoryValid } from "../../mocks/category.mock";
import { prisma } from "../../../database";

describe("create product", async () => {
  // it("should be able to create product successfully", async () => {
  //   const category = await prisma.category.create({ data: categoryValid });

  //   const data = await request
  //     .post("/products")
  //     .send(productValid)
  //     .expect(201)
  //     .then((response) => response.body);

  //   expect(data).toBeDefined();
  //   expect(data).toBeTypeOf("object");

  //   expect(data.id).toBeDefined();
  //   expect(data.id).toBeTypeOf("number");

  //   expect(data.name).toBeDefined();
  //   expect(data.name).toBeTypeOf("string");

  //   expect(data.price).toBeDefined();
  //   expect(data.price).toBeTypeOf("string");

  //   expect(data.description).toBeDefined();
  //   expect(data.description).toBeTypeOf("string");

  //   expect(data.imgCover).toBeDefined();
  //   expect(data.imgCover).toBeTypeOf("string");

  //   expect(data.createdAt).toBeDefined();
  //   expect(data.createdAt).toBeTypeOf("string");

  //   expect(data.categoryId).toBeDefined();
  //   expect(data.categoryId).toBeTypeOf("number");
  // });

  it("should throw error when try to create a product with a missing body parameter", async () => {
    await request.post("/products").expect(400);
  });

  it("should throw error when try to create a product with invalid data types", async () => {
    await request.post("/additionals").send(productBodyInvalid).expect(400);
  });

  it("should throw error when try to create a product with a invalid category", async () => {
    await request.post("/additionals").send(productInvalidCategory).expect(400);
  });
});
