import { Request, Response } from "express";
import categoriesService from "../services/categories.service";

class CategoriesController {
  async getAllCategories(request: Request, response: Response) {
    const categories = await categoriesService.findAll();
    return response.json(categories).status(200);
  }

  async createCategory(request: Request, response: Response) {
    const category = await categoriesService.createCategory(request.body);
    return response.json(category).status(201);
  }
}

export default new CategoriesController();
