import { Recipe } from './recipe.model';

export interface IRepository {
  save(recipe: Recipe): boolean;
}
