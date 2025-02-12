import { RecipeFactory } from './recipe.factory';
import { Ingredient, Recipe } from './recipe.model';
import { CulinaryRecipesDataSource } from './../../../src/infrastructure/typeorm/data-source';
import { RecipesTypeOrmRepository } from './recipe.typeormrepository';

describe('RecipesTypeOrmRepository', () => {
  const subject = new RecipesTypeOrmRepository();
  const database = CulinaryRecipesDataSource.getRepository(Recipe);

  describe('#save', () => {
    describe('when valid data provided', () => {
      const recipe = RecipeFactory.forTest();

      it('returns Recipe record with assigned ID', async () => {
        const result = await subject.save(recipe);

        expect(result.id).toBeDefined();
      });

      // xit('adds new Recipe record in database', async () => {
      //   const recipesCountBefore = await database.recipe.count();
      //   await subject.save(recipe);
      //   const recipesCountAfter = await database.recipe.count();

      //   expect(recipesCountAfter).toEqual(recipesCountBefore + 1);
      // });

      // xit('returns newly created Recipe object with provided values', async () => {
      //   const result = await subject.save(recipe);
      //   const newRecipe = await subject.findByName(result.recipeName);

      //   expect(newRecipe.recipeName).toEqual('Jajecznica');
      //   expect(newRecipe.description).toEqual(
      //     'Proste i pyszne śniadanie na dobry początek dnia!',
      //   );
      //   expect(newRecipe.instructions).toEqual(
      //     'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
      //   );
      // });

      // xit('adds as much new Ingredient records in database as associated with Recipe', async () => {
      //   const ingredientsCountBefore = await database.ingredient.count();
      //   await subject.save(recipe);
      //   const ingredientsCountAfter = await database.ingredient.count();

      //   expect(ingredientsCountAfter).toEqual(ingredientsCountBefore + 2);
      // });

      // xit('returns Recipe object with associated Ingredient objects having values as provided', async () => {
      //   const result = await subject.save(recipe);
      //   const newRecipe = await subject.findByName(result.recipeName);
      //   const firstIngredient = newRecipe.ingredients[0];
      //   const secondIngredient = newRecipe.ingredients[1];

      //   expect(firstIngredient instanceof Ingredient).toBe(true);
      //   expect(firstIngredient.id).toBeDefined();
      //   expect(firstIngredient.name).toEqual('jajka');
      //   expect(firstIngredient.quantity).toEqual(4);
      //   expect(firstIngredient.quantityUnit).toEqual('szt.');

      //   expect(secondIngredient instanceof Ingredient).toBe(true);
      //   expect(secondIngredient.id).toBeDefined();
      //   expect(secondIngredient.name).toEqual('masło');
      //   expect(secondIngredient.quantity).toEqual(20);
      //   expect(secondIngredient.quantityUnit).toEqual('g');
      // });
    });

    // describe('when record cannot be saved', () => {
    //   const recipe = new Recipe({ ingredients: [] });

    //   it('raises RecipeNotCreatedError exception', async () => {
    //     try {
    //       await subject.save(recipe);
    //     } catch (error) {
    //       expect(error.name).toEqual('RecipeNotCreatedError');
    //     }
    //   });

    //   it('raises error with appropriate message', async () => {
    //     try {
    //       await subject.save(recipe);
    //     } catch (error) {
    //       expect(error.message).toContain("Recipe couldn't be saved:");
    //     }
    //   });
    // });
  });
});
