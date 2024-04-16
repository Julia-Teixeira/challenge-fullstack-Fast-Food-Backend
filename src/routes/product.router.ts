import express from "express";
import productController from "../controller/product.controller";
import ensureMiddleware from "../middleware/ensure.middleware";
import { createProductSchema } from "../schema/product.schema";

const productRouter = express.Router();

productRouter.get("", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post(
  "",
  ensureMiddleware.validBody(createProductSchema),
  productController.createProduct,
);

export default productRouter;
