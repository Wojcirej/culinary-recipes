import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { Ingredient } from './entities/ingredient.entity';
import configuration from '../../../config/settings/main';
const { database } =
  configuration[process.env.CULINARY_RECIPES_ENV || 'development']();
const { host, port, username, password, name } = database;

export const CulinaryRecipesDataSource = new DataSource({
  type: 'postgres',
  host: host,
  port: port,
  username: username,
  password: password,
  database: name,
  synchronize: true,
  logging: false,
  entities: [Recipe, Ingredient],
  migrations: [],
  subscribers: [],
});

CulinaryRecipesDataSource.initialize().then(() => {
  //try like that
  console.log('CulinaryRecipes TypeORM DataSource initialized!');
});
