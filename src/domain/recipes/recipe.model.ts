import { IngredientFactory } from './recipe.factory';

export class Recipe {
  public readonly id?: number;
  public readonly recipeName: string;
  public readonly ingredients: Ingredient[];
  public readonly description: string;
  public readonly instructions: string;

  constructor(attributes: object) {
    this.id = attributes['id'];
    this.recipeName = attributes['recipeName'];
    this.ingredients = IngredientFactory.collectionFromAttributes(
      attributes['ingredients'],
    );
    this.description = attributes['description'];
    this.instructions = attributes['instructions'];
  }

  public serializeForPersistence() {
    return {
      name: this.recipeName,
      description: this.description,
      instructions: this.instructions,
      ingredients: {
        create: this.ingredients.map((ingredient) => {
          return ingredient.serializeForPersistence();
        }),
      },
    };
  }
}

export class Ingredient {
  public readonly id?: number;
  public readonly name: string;
  public readonly quantity: number;
  public readonly quantityUnit: string;

  constructor(attributes: object) {
    this.id = attributes['id'];
    this.name = attributes['name'];
    this.quantity = attributes['quantity'];
    this.quantityUnit = attributes['quantityUnit'];
  }

  public serializeForPersistence() {
    return {
      name: this.name,
      quantity: this.quantity,
      quantityUnit: this.quantityUnit,
    };
  }
}
