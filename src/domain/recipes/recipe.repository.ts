import { Recipe } from './recipe.model';
import { IRecipesRepository } from './interfaces';
import { CulinaryRecipesPrismaClient } from '../../infrastructure/culinaryRecipesPrismaClient';

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

  public async findAll(page = 1, perPage = 25): Promise<Recipe[]> {
    try {
      const result = await this.database.recipe.findMany({
        include: { ingredients: true },
        skip: (page - 1) * perPage,
        take: perPage,
      });
      const recipes = result.map((recipe) => {
        return new Recipe({
          id: recipe.id,
          recipeName: recipe.name,
          description: recipe.description,
          instructions: recipe.instructions,
          ingredients: recipe.ingredients,
        });
      });
      return recipes;
    } catch (error) {
      throw new FetchingRecipesError(error.message);
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

  public async findAll(page: number, perPage: number): Promise<Recipe[]> {
    return this.database;
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

class FetchingRecipesError extends Error {
  readonly name: string;

  constructor(message: string) {
    super(`Couldn't fetch Recipes: ${message}`);
    this.name = 'FetchingRecipesError';
  }
}
