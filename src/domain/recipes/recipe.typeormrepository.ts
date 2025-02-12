import { Recipe } from './recipe.model';
import { IRecipesRepository } from './interfaces';
import { DataSource, Repository } from 'typeorm';
import { CulinaryRecipesDataSource } from './../../../src/infrastructure/typeorm/data-source';
import RecipeEntity from './../../../src/infrastructure/typeorm/entities/recipe.entity';

export class RecipesTypeOrmRepository implements IRecipesRepository {
  private readonly dataSource: DataSource;
  private readonly repository: Repository<Recipe>;

  constructor() {
    this.dataSource = CulinaryRecipesDataSource;
    this.repository = CulinaryRecipesDataSource.getRepository(Recipe);
  }

  public async save(recipe: Recipe): Promise<Recipe> {
    try {
      this.dataSource.initialize().then(() => {
        console.log('CulinaryRecipes TypeORM DataSource initialized!');
        const data = recipe.serializeForPersistence();
        const forPersistence = new RecipeEntity();
        forPersistence.description = data['description'];
        forPersistence.instructions = data['instructions'];
        forPersistence.name = data['name'];
        forPersistence.save();
      });
      return recipe;
    } catch (error) {
      throw new RecipeNotCreatedError(error.message);
    }
  }

  // public async findByName(name: string): Promise<Recipe> {
  //   try {
  //   } catch (error) {
  //     throw new RecipeNotFoundByNameError(error.message, name);
  //   }
  // }

  public async findAll(page = 1, perPage = 25): Promise<Recipe[]> {
    try {
      return [new Recipe({})];
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
