import { beforeEach } from "vitest";
import app from "../app";
import supertest from "supertest";
import { prisma } from "../database";

export const request = supertest(app);

beforeEach(async () => {
  await prisma.$transaction([
    prisma.category.deleteMany(),
    prisma.additional.deleteMany(),
    prisma.product.deleteMany(),
    prisma.order.deleteMany(),
    prisma.productOrder.deleteMany(),
    prisma.payment.deleteMany(),
  ]);
});
