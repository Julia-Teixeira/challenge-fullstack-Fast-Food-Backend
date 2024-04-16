import { Request, Response } from "express";
import categoriesService from "../services/categories.service";

class CategoriesController {
  async getAllCategories(request: Request, response: Response) {
    const options = {
      page: Number(request.query.page) || 1,
      perPage: Number(request.query.perPage) || 20,
    };
    const categories = await categoriesService.findAll(options);
    return response.json(categories).status(200);
  }

  async createCategory(request: Request, response: Response) {
    const category = await categoriesService.create(request.body);
    return response.status(201).json(category);
  }
}

export default new CategoriesController();
