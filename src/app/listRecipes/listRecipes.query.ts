import { IRecipesRepository } from 'src/domain/recipes/interfaces';
import { PaginatedQuery } from '../interfaces';
import { ListRecipesResponse } from './listRecipes.interfaces';
import { RecipesRepository } from 'src/domain/recipes/recipe.repository';
import { ListRecipesService } from './listRecipes.service';

export class ListRecipesQuery extends PaginatedQuery {
  public async execute(
    repository?: IRecipesRepository,
  ): Promise<ListRecipesResponse> {
    const repo = repository || new RecipesRepository();
    return await new ListRecipesService(this, repo).execute();
  }
}
