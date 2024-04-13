import { TCategory, TCreateCategory } from "../interface/category.interface";
import categoryRepository from "../database/repository/category.repository";
import { TPaginatedResult } from "../interface/pagnation.interface";

class CategoriesService {
  async create(data: TCreateCategory): Promise<TCategory> {
    return await categoryRepository.create(data);
  }

  async findAll(): Promise<TPaginatedResult<TCategory>> {
    return await categoryRepository.findAll();
  }
}

export default new CategoriesService();
