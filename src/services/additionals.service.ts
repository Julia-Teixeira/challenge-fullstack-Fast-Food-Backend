import {
  TAdditional,
  TCreateAdditional,
} from "../interface/additional.interface";
import { additionalRepository } from "../database";
import {
  PaginateOptions,
  TPaginatedResult,
} from "../interface/pagination.interface";

class AdditionalsService {
  async create(data: TCreateAdditional): Promise<TAdditional> {
    return await additionalRepository.create(data);
  }

  async findAll(
    options?: PaginateOptions,
  ): Promise<TPaginatedResult<TAdditional>> {
    return await additionalRepository.findAll(options);
  }
}

export default new AdditionalsService();
