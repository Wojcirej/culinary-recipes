import { IRecipesRepository } from 'src/domain/recipes/interfaces';
import { PaginatedQuery } from '../interfaces';
import { ListRecipesResponse } from './listRecipes.interfaces';
import {
  ListRecipesInvalidPaginationParamsResponse,
  ListRecipesSuccessResponse,
} from './listRecipes.responses';

export class ListRecipesService {
  private readonly query: PaginatedQuery;
  private readonly repository: IRecipesRepository;

  constructor(query: PaginatedQuery, repository: IRecipesRepository) {
    this.query = query;
    this.repository = repository;
  }

  public async execute(): Promise<ListRecipesResponse> {
    const paginationParams = this.query.serializePaginationParams();
    if (this.query.isInvalid()) {
      return new ListRecipesInvalidPaginationParamsResponse(paginationParams);
    }

    const { pageSize, page } = paginationParams;
    const data = await this.repository.findAll(page, pageSize);
    return new ListRecipesSuccessResponse(data, paginationParams);
  }
}
