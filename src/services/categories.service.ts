import { TCategory, TCreateCategory } from "../interface/category.interface";
import { categoryRepository } from "../database/";
import {
  PaginateOptions,
  TPaginatedResult,
} from "../interface/pagination.interface";

class CategoriesService {
  async create(data: TCreateCategory): Promise<TCategory> {
    return await categoryRepository.create(data);
  }

  async findAll(
    options?: PaginateOptions,
  ): Promise<TPaginatedResult<TCategory>> {
    return await categoryRepository.findAll(options);
  }
}

export default new CategoriesService();
