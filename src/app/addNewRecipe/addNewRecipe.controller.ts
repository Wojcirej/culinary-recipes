import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AddNewRecipeCommand } from './addNewRecipe.command';

@Controller('recipes')
export class AddNewRecipeController {
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) command: AddNewRecipeCommand,
    @Res() response: Response,
  ) {
    const { status, payload } = command.execute().getResponse();
    response.status(status).send(payload);
  }
}
