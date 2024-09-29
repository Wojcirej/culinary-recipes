import { Ingredient, Recipe } from './recipe.model';

export class RecipeFactory {
  public static fromCommandAttributes(attributes) {
    return new Recipe({
      recipeName: attributes['recipeName'],
      ingredients: attributes['ingredients'],
      description: attributes['description'],
      instructions: attributes['instructions'],
    });
  }
}

export class IngredientFactory {
  public static collectionFromAttributes(attributes) {
    return attributes.map((attrs) => {
      return new Ingredient({
        name: attrs['name'],
        quantity: attrs['quantity'],
        quantityUnit: attrs['quantityUnit'],
      });
    });
  }
}
