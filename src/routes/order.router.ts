import express from "express";
import orderController from "../controller/order.controller";
import ensureMiddleware from "../middleware/ensure.middleware";
import { createOrderSchema } from "../schema/order.schema";

const orderRouter = express.Router();

orderRouter.post(
  "",
  ensureMiddleware.validBody(createOrderSchema),
  orderController.createOrder,
);
orderRouter.get("", orderController.getAllOrders);
orderRouter.get("/:id", orderController.getOrderById);
orderRouter.patch("/:id", orderController.updateOrder);
orderRouter.delete("/:id", orderController.deleteOrder);

export default orderRouter;
