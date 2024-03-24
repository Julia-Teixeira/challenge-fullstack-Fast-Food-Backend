import express from "express";
import categoriesController from "../controller/categories.controller";

const categoriesRouter = express.Router();

categoriesRouter.get("", categoriesController.getAllCategories);
categoriesRouter.post("", categoriesController.createCategory);

export default categoriesRouter;
