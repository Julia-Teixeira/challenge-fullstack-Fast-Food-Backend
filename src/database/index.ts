import prisma from "./repository/prisma.repository";
import productRepository from "./repository/product.repository";
import categoryRepository from "./repository/category.repository";
import additionalRepository from "./repository/additional.repository";
import productOrderRepository from "./repository/productOrder.repository";
import orderRepository from "./repository/order.repository";

export {
  prisma,
  productRepository,
  categoryRepository,
  additionalRepository,
  orderRepository,
  productOrderRepository,
};
