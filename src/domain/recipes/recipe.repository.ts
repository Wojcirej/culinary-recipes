import { Recipe } from './recipe.model';
import { IRecipesRepository } from './interfaces';
import { CulinaryRecipesPrismaClient } from './../../../prisma/culinaryRecipesPrismaClient';

export class RecipesRepository implements IRecipesRepository {
  private readonly database: CulinaryRecipesPrismaClient;

  constructor() {
    this.database = new CulinaryRecipesPrismaClient();
  }

  public async save(recipe: Recipe): Promise<Recipe> {
    try {
      const result = await this.database.recipe.create({
        data: recipe.serializeForPersistence(),
        include: { ingredients: true },
      });
      const createdRecipe = new Recipe({
        id: result.id,
        recipeName: result.name,
        description: result.description,
        instructions: result.instructions,
        ingredients: result.ingredients,
      });
      return createdRecipe;
    } catch (error) {
      throw new RecipeNotCreatedError(error.message);
    }
  }

  public async findByName(name: string): Promise<Recipe> {
    try {
      const result = await this.database.recipe.findFirstOrThrow({
        where: { name: name },
        include: { ingredients: true },
      });
      const recipe = new Recipe({
        id: result.id,
        recipeName: result.name,
        description: result.description,
        instructions: result.instructions,
        ingredients: result.ingredients,
      });
      return recipe;
    } catch (error) {
      throw new RecipeNotFoundByNameError(error.message, name);
    }
  }
}

export class RecipesInMemoryRepository implements IRecipesRepository {
  readonly database: Recipe[];

  constructor() {
    this.database = [];
  }

  public async save(recipe: Recipe): Promise<Recipe> {
    this.database.push(recipe);
    return recipe;
  }
}

class RecipeNotFoundByNameError extends Error {
  readonly name: string;

  constructor(message: string, recipeName: string) {
    super(`${message} error: Recipe with name "${recipeName}" does not exist.`);
    this.name = 'RecipeNotFoundByNameError';
  }
}

class RecipeNotCreatedError extends Error {
  readonly name: string;

  constructor(message: string) {
    super(`Recipe couldn't be saved: ${message}`);
    this.name = 'RecipeNotCreatedError';
  }
}
