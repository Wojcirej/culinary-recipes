import { Module } from '@nestjs/common';
import { ListRecipesController } from './listRecipes.controller';

@Module({
  controllers: [ListRecipesController],
})
export class ListRecipesModule {}
