import express from "express";
import orderController from "../controller/order.controller";

const orderRouter = express.Router();

orderRouter.post("", orderController.createOrder);
orderRouter.get("", orderController.getAllOrders);
orderRouter.patch("/:id", orderController.updateOrder);
orderRouter.delete("/:id", orderController.deleteOrder);

export default orderRouter;
