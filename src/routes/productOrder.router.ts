import express from "express";
import productOrderController from "../controller/productOrder.controller";
import ensureMiddleware from "../middleware/ensure.middleware";
import { productOrderSchema } from "../schema/productOrder.schema";

const productRouter = express.Router();

productRouter.post(
  "",
  ensureMiddleware.validBody(productOrderSchema),
  productOrderController.createProductOrder,
);
productRouter.delete("/:id", productOrderController.deleteProductOrder);

export default productRouter;
