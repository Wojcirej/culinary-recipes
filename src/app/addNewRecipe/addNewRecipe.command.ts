import { Type } from 'class-transformer';
import { AddNewRecipeResponse } from './addNewRecipe.interfaces';
import { AddNewRecipeService } from './addNewRecipe.service';
import { Command } from './../../app/interfaces';
import { IRecipesRepository } from './../../domain/recipes/interfaces';
import { RecipesRepository } from './../../domain/recipes/recipe.repository';

export class AddNewRecipeCommand implements Command {
  private readonly recipeName: string;
  @Type(() => Ingredient)
  private readonly ingredients: Ingredient[];
  private readonly description: string;
  private readonly instructions: string;

  public isValid(): boolean {
    if (this.ingredients === undefined) {
      return false;
    }
    return (
      this.ingredients.length > 0 &&
      this.ingredients.every((ingredient) => ingredient.IsValid())
    );
  }

  public isInvalid(): boolean {
    return !this.isValid();
  }

  public toObject(): object {
    return {
      recipeName: this.recipeName,
      ingredients: this.ingredients.map((ingredient) => ingredient.toObject()),
      description: this.description,
      instructions: this.instructions,
    };
  }

  public execute(repository?: IRecipesRepository): AddNewRecipeResponse {
    const repo = repository || new RecipesRepository();
    return new AddNewRecipeService(this, repo).execute();
  }
}

class Ingredient {
  private readonly name: string;
  private readonly quantity: number;
  private readonly quantityUnit: string;

  public IsValid(): boolean {
    return this.quantity > 0;
  }

  public toObject(): object {
    return {
      name: this.name,
      quantity: this.quantity,
      quantityUnit: this.quantityUnit,
    };
  }
}
