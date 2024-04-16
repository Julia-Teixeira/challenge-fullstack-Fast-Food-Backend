import { Request, Response } from "express";
import additionalsService from "../services/additionals.service";

class AdditionalController {
  async create(request: Request, response: Response) {
    const additional = await additionalsService.create(request.body);
    return response.status(201).json(additional);
  }

  async getAll(request: Request, response: Response) {
    const options = {
      page: Number(request.query.page) || 1,
      perPage: Number(request.query.perPage) || 20,
    };
    const additionals = await additionalsService.findAll(options);
    return response.json(additionals).status(200);
  }
}

export default new AdditionalController();
