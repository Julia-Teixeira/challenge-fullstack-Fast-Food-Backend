import { Request, Response } from "express";
import additionalsService from "../services/additionals.service";

class AdditionalController {
  async create(request: Request, response: Response) {
    const additional = await additionalsService.create(request.body);
    return response.json(additional).status(201);
  }

  async getAll(request: Request, response: Response) {
    const additionals = await additionalsService.findAll();
    return response.json(additionals).status(200);
  }
}

export default new AdditionalController();
