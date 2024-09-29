import { PrismaClient } from '@prisma/client';
import { IRepository } from './interfaces';
import { Recipe } from './recipe.model';

export class RecipesRepository implements IRepository {
  readonly database: PrismaClient;
  constructor() {
    // this.database = new PrismaClient();
    this.database = [];
  }

  public save(recipe: Recipe): boolean {
    this.database.push(recipe);
    return true;
  }
}

export class RecipesInMemoryRepository implements IRepository {
  readonly database: Recipe[];

  constructor() {
    this.database = [];
  }

  public save(recipe: Recipe): boolean {
    this.database.push(recipe);
    return true;
  }
}
