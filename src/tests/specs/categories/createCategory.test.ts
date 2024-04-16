import { describe, expect, it } from "vitest";
import { request } from "../../setupFiles";
import {
  categoryValid,
  categoryNameInvalid,
  categoryNameRepeat,
} from "../../mocks/category.mock";

describe("create category", async () => {
  // it("should be able to create category successfully", async () => {
  //   const data = await request
  //     .post("/categories")
  //     .send(categoryValid)
  //     .expect(201)
  //     .then((response) => response.body);

  //   expect(data).toBeDefined();
  //   expect(data).toBeTypeOf("object");

  //   expect(data.id).toBeDefined();
  //   expect(data.id).toBeTypeOf("number");

  //   expect(data.name).toBeDefined();
  //   expect(data.name).toBeTypeOf("string");

  //   expect(data.imgCover).toBeDefined();
  //   expect(data.imgCover).toBeTypeOf("string");

  //   expect(data.createdAt).toBeDefined();
  //   expect(data.createdAt).toBeTypeOf("string");
  // });

  it("should throw error when try to create a category with a missing body parameter", async () => {
    await request.post("/categories").expect(400);
  });

  it("should throw error when try to create a category with invalid data types", async () => {
    await request.post("/categories").send(categoryNameInvalid).expect(400);
  });

  // it("should throw error when try to create a category with a name that already exists", async () => {
  //   await request.post("/categories").send(categoryValid);
  //   await request.post("/categories").send(categoryNameRepeat).expect(409);
  // });
});
