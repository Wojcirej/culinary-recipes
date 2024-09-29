import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AddNewRecipeCommand } from './addNewRecipe.command';
import { RecipesInMemoryRepository } from '../domain/recipe.repository';

@Controller('recipes')
export class AddNewRecipeController {
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) command: AddNewRecipeCommand,
    @Res() response: Response,
  ) {
    const repository = new RecipesInMemoryRepository();
    const { status, payload } = command.execute(repository).getResponse();
    response.status(status).send(payload);
  }
}
