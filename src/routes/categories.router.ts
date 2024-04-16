import express from "express";
import categoriesController from "../controller/categories.controller";
import ensureMiddleware from "../middleware/ensure.middleware";
import { createCategorySchema } from "../schema/category.schema";

const categoriesRouter = express.Router();

categoriesRouter.get("", categoriesController.getAllCategories);
categoriesRouter.post(
  "",
  ensureMiddleware.validBody(createCategorySchema),
  categoriesController.createCategory,
);

export default categoriesRouter;
