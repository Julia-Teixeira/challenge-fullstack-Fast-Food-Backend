import express from "express";
import productController from "../controller/product.controller";

const productRouter = express.Router();

productRouter.get("", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);

export default productRouter;
