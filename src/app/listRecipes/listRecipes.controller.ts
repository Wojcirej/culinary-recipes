import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ListRecipesQuery } from './listRecipes.query';

@Controller('recipes')
export class ListRecipesController {
  @Get()
  async get(@Query() params, @Res() response: Response) {
    const query = new ListRecipesQuery(params);
    const result = await query.execute();
    const { status, payload } = result.getResponse();
    response.status(status).send(payload);
  }
}
