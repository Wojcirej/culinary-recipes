import { RecipeFactory } from './recipe.factory';
import { RecipesRepository } from './recipe.repository';
import { Ingredient, Recipe } from './recipe.model';
import { CulinaryRecipesPrismaClient } from './../../../prisma/culinaryRecipesPrismaClient';

describe('RecipesRepository', () => {
  const subject = new RecipesRepository();
  const database = new CulinaryRecipesPrismaClient();

  describe('#save', () => {
    describe('when valid data provided', () => {
      const recipe = RecipeFactory.forTest();

      it('returns Recipe record with assigned ID', async () => {
        const result = await subject.save(recipe);

        expect(result.id).toBeDefined();
      });

      it('adds new Recipe record in database', async () => {
        const recipesCountBefore = await database.recipe.count();
        await subject.save(recipe);
        const recipesCountAfter = await database.recipe.count();

        expect(recipesCountAfter).toEqual(recipesCountBefore + 1);
      });

      it('returns newly created Recipe object with provided values', async () => {
        const result = await subject.save(recipe);
        const newRecipe = await subject.findByName(result.recipeName);

        expect(newRecipe.recipeName).toEqual('Jajecznica');
        expect(newRecipe.description).toEqual(
          'Proste i pyszne śniadanie na dobry początek dnia!',
        );
        expect(newRecipe.instructions).toEqual(
          'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
        );
      });

      it('adds as much new Ingredient records in database as associated with Recipe', async () => {
        const ingredientsCountBefore = await database.ingredient.count();
        await subject.save(recipe);
        const ingredientsCountAfter = await database.ingredient.count();

        expect(ingredientsCountAfter).toEqual(ingredientsCountBefore + 2);
      });

      it('returns Recipe object with associated Ingredient objects having values as provided', async () => {
        const result = await subject.save(recipe);
        const newRecipe = await subject.findByName(result.recipeName);
        const firstIngredient = newRecipe.ingredients[0];
        const secondIngredient = newRecipe.ingredients[1];

        expect(firstIngredient instanceof Ingredient).toBe(true);
        expect(firstIngredient.id).toBeDefined();
        expect(firstIngredient.name).toEqual('jajka');
        expect(firstIngredient.quantity).toEqual(4);
        expect(firstIngredient.quantityUnit).toEqual('szt.');

        expect(secondIngredient instanceof Ingredient).toBe(true);
        expect(secondIngredient.id).toBeDefined();
        expect(secondIngredient.name).toEqual('masło');
        expect(secondIngredient.quantity).toEqual(20);
        expect(secondIngredient.quantityUnit).toEqual('g');
      });
    });

    describe('when record cannot be saved', () => {
      const recipe = new Recipe({ ingredients: [] });

      it('raises RecipeNotCreatedError exception', async () => {
        try {
          await subject.save(recipe);
        } catch (error) {
          expect(error.name).toEqual('RecipeNotCreatedError');
        }
      });

      it('raises error with appropriate message', async () => {
        try {
          await subject.save(recipe);
        } catch (error) {
          expect(error.message).toContain("Recipe couldn't be saved:");
        }
      });
    });
  });

  describe('#findByName', () => {
    describe('when record with provided name does not exist', () => {
      it('raises RecipeNotFoundByNameError exception', async () => {
        try {
          await subject.findByName('I do not exist');
        } catch (error) {
          expect(error.name).toEqual('RecipeNotFoundByNameError');
        }
      });

      it('raises error with appropriate message', async () => {
        try {
          await subject.findByName('I do not exist');
        } catch (error) {
          expect(error.message).toEqual(
            'No Recipe found error: Recipe with name "I do not exist" does not exist.',
          );
        }
      });
    });

    describe('when record with provided name exists', () => {
      const recipe = RecipeFactory.forTest();

      beforeAll(async () => {
        await subject.save(recipe);
      });

      it('returns Recipe object', async () => {
        const result = await subject.findByName('Jajecznica');

        expect(result instanceof Recipe).toBe(true);
        expect(result.recipeName).toEqual('Jajecznica');
        expect(result.description).toEqual(
          'Proste i pyszne śniadanie na dobry początek dnia!',
        );
        expect(result.instructions).toEqual(
          'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
        );
      });

      it('returns Recipe object with associated ingredients', async () => {
        const result = await subject.findByName('Jajecznica');
        const firstIngredient = result.ingredients[0];
        const secondIngredient = result.ingredients[1];

        expect(firstIngredient instanceof Ingredient).toBe(true);
        expect(firstIngredient.name).toEqual('jajka');
        expect(firstIngredient.quantity).toEqual(4);
        expect(firstIngredient.quantityUnit).toEqual('szt.');

        expect(secondIngredient instanceof Ingredient).toBe(true);
        expect(secondIngredient.name).toEqual('masło');
        expect(secondIngredient.quantity).toEqual(20);
        expect(secondIngredient.quantityUnit).toEqual('g');
      });
    });
  });
});
