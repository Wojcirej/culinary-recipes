import { Recipe } from './recipe.model';

export interface IRepository {
  // readonly database: PrismaClient;
  save(recipe: Recipe): boolean;
}
