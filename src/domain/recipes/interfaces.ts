import { Recipe } from './recipe.model';

export interface IRecipesRepository {
  save(recipe: Recipe): Promise<Recipe>;
}
