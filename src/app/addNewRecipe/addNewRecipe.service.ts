import { IRecipesRepository } from '../../domain/recipes/interfaces';
import { AddNewRecipeCommand } from './addNewRecipe.command';
import { AddNewRecipeResponse } from './addNewRecipe.interfaces';
import {
  AddNewRecipeSuccessResponse,
  AddNewRecipeInvalidPayloadResponse,
} from './addNewRecipe.responses';
import { RecipeFactory } from '../../domain/recipes/recipe.factory';
import { Recipe } from 'src/domain/recipes/recipe.model';

export class AddNewRecipeService {
  private readonly command: AddNewRecipeCommand;
  private readonly repository: IRecipesRepository;

  constructor(command: AddNewRecipeCommand, repository: IRecipesRepository) {
    this.command = command;
    this.repository = repository;
  }

  public execute(): AddNewRecipeResponse {
    if (this.command.isInvalid()) {
      return new AddNewRecipeInvalidPayloadResponse();
    }
    const recipe: Recipe = RecipeFactory.fromCommandAttributes(
      this.command.toObject(),
    );
    if (this.repository.save(recipe)) {
      return new AddNewRecipeSuccessResponse();
    }
  }
}
