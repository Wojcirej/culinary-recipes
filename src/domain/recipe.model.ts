import { IngredientFactory } from './recipe.factory';

export class Recipe {
  private readonly recipeName: string;
  private readonly ingredients: Ingredient[];
  private readonly description: string;
  private readonly instructions: string;

  constructor(attributes: object) {
    this.recipeName = attributes['recipeName'];
    this.ingredients = IngredientFactory.collectionFromAttributes(
      attributes['ingredients'],
    );
    this.description = attributes['description'];
    this.instructions = attributes['instructions'];
  }
}

export class Ingredient {
  private readonly name: string;
  private readonly quantity: number;
  private readonly quantityUnit: string;

  constructor(attributes: object) {
    this.name = attributes['name'];
    this.quantity = attributes['quantity'];
    this.quantityUnit = attributes['quantityUnit'];
  }
}
