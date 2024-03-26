import express from "express";
import productOrderController from "../controller/productOrder.controller";

const productRouter = express.Router();

productRouter.post("", productOrderController.createProductOrder);
productRouter.delete("/:id", productOrderController.deleteProductOrder);

export default productRouter;
