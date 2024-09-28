import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AddNewRecipeCommand } from './addNewRecipe.command';

@Controller('recipes')
export class AddNewRecipeController {
  constructor() {}

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) command: AddNewRecipeCommand,
    @Res() response: Response,
  ) {
    if (command.IsValid()) {
      response.status(HttpStatus.CREATED).send({ message: 'Success' });
    } else {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        message: 'Invalid payload',
      });
    }
  }
}
