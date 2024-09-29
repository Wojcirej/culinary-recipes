import { IRepository } from './../domain/interfaces';
import { AddNewRecipeCommand } from './addNewRecipe.command';
import { AddNewRecipeResponse } from './addNewRecipe.interfaces';
import {
  AddNewRecipeSuccessResponse,
  AddNewRecipeInvalidPayloadResponse,
} from './addNewRecipe.responses';
import { RecipeFactory } from './../domain/recipe.factory';
import { Recipe } from 'src/domain/recipe.model';

export class AddNewRecipeService {
  private readonly command: AddNewRecipeCommand;
  private readonly repository: IRepository;

  constructor(command: AddNewRecipeCommand, repository: IRepository) {
    this.command = command;
    this.repository = repository;
  }

  public execute(): AddNewRecipeResponse {
    if (this.command.IsInvalid()) {
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
