import { Type } from 'class-transformer';

export class AddNewRecipeCommand {
  private readonly recipeName: string;
  @Type(() => Ingredient)
  private readonly ingredients: Ingredient[];
  private readonly description: string;
  private readonly instructions: string;

  public IsValid(): boolean {
    return (
      this.ingredients.length > 0 &&
      this.ingredients.every((ingredient) => ingredient.IsValid())
    );
  }
}

class Ingredient {
  private readonly name: string;
  private readonly quantity: number;
  private readonly quantityUnit: string;

  public IsValid(): boolean {
    return this.quantity > 0;
  }
}
