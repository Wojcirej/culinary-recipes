import { Type } from 'class-transformer';
import { IRepository } from './../../domain/interfaces';
import { AddNewRecipeResponse } from './addNewRecipe.interfaces';
import { AddNewRecipeService } from './addNewRecipe.service';
import { Command } from './../../app/interfaces';

export class AddNewRecipeCommand implements Command {
  private readonly recipeName: string;
  @Type(() => Ingredient)
  private readonly ingredients: Ingredient[];
  private readonly description: string;
  private readonly instructions: string;

  public isValid(): boolean {
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

  public execute(repository: IRepository): AddNewRecipeResponse {
    return new AddNewRecipeService(this, repository).execute();
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
