import express from "express";
import productOrderController from "../controller/productOrder.controller";

const productRouter = express.Router();

productRouter.post("", productOrderController.createProductOrder);

export default productRouter;
