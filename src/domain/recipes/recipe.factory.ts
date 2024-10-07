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

  public static forTest() {
    return new Recipe({
      recipeName: 'Jajecznica',
      ingredients: IngredientFactory.collectionFromAttributes([
        {
          name: 'jajka',
          quantity: 4,
          quantityUnit: 'szt.',
        },
        {
          name: 'masło',
          quantity: 20,
          quantityUnit: 'g',
        },
      ]),
      description: 'Proste i pyszne śniadanie na dobry początek dnia!',
      instructions: 'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
    });
  }
}

export class IngredientFactory {
  public static collectionFromAttributes(attributes) {
    return attributes.map((attrs) => {
      return new Ingredient({
        id: attrs['id'],
        name: attrs['name'],
        quantity: attrs['quantity'],
        quantityUnit: attrs['quantityUnit'],
      });
    });
  }
}
