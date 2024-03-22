import { Request, Response } from "express";
import categoriesService from "../services/categories.service";

class CategoriesController {
  async getAllCategories(request: Request, response: Response) {
    const categories = await categoriesService.findAll();
    return response.json(categories).status(200);
  }
}

export default new CategoriesController();
