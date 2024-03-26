import express from "express";
import productController from "../controller/product.controller";

const productRouter = express.Router();

productRouter.get("", productController.getAllProducts);
productRouter.get("/additional", productController.getAdditionalData);
productRouter.get("/:id", productController.getProductById);
productRouter.post("", productController.createProduct);

export default productRouter;
