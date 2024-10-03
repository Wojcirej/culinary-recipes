import { Module } from '@nestjs/common';
import { AddNewRecipeController } from './addNewRecipe.controller';

@Module({
  controllers: [AddNewRecipeController],
})
export class AddNewRecipeModule {}
