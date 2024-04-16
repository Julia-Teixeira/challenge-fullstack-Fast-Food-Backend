import { describe, expect, it } from "vitest";
import { request } from "../../setupFiles";
import {
  additionalValid,
  additionalInvalidBody,
} from "../../mocks/additional.mock";

describe("create additional", async () => {
  it("should be able to create additional successfully", async () => {
    const data = await request
      .post("/additionals")
      .send(additionalValid)
      .expect(201)
      .then((response) => response.body);

    expect(data).toBeDefined();
    expect(data).toBeTypeOf("object");

    expect(data.id).toBeDefined();
    expect(data.id).toBeTypeOf("number");

    expect(data.name).toBeDefined();
    expect(data.name).toBeTypeOf("string");

    expect(data.price).toBeDefined();
    expect(data.price).toBeTypeOf("string");

    expect(data.description).toBeDefined();
    expect(data.description).toBeTypeOf("string");

    expect(data.imgCover).toBeDefined();
    expect(data.imgCover).toBeTypeOf("string");

    expect(data.createdAt).toBeDefined();
    expect(data.createdAt).toBeTypeOf("string");
  });

  it("should throw error when try to create a additional with a missing body parameter", async () => {
    await request.post("/additionals").expect(400);
  });

  it("should throw error when try to create a category with invalid data types", async () => {
    await request.post("/additionals").send(additionalInvalidBody).expect(400);
  });

  it("should throw error when try to create a additional with a name that already exists", async () => {
    await request.post("/additionals").send(additionalValid);
    await request.post("/additionals").send(additionalValid).expect(409);
  });
});
