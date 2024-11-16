import { AddNewRecipeCommand } from './addNewRecipe.command';
import { plainToClass } from 'class-transformer';

describe('AddNewRecipeCommand', () => {
  describe('#isValid', () => {
    describe('when empty payload provided', () => {
      it('returns false', () => {
        const payload = {};
        const command = plainToClass(AddNewRecipeCommand, payload);
        expect(command.isValid()).toBe(false);
      });
    });

    describe('when invalid payload provided', () => {
      it('returns false', () => {
        const payload = {
          recipeName: 'Jajecznica',
          ingredients: [],
          description: 'Proste i pyszne śniadanie na dobry początek dnia!',
          instructions: 'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
        };
        const command = plainToClass(AddNewRecipeCommand, payload);
        expect(command.isValid()).toBe(false);
      });
    });

    describe('when invalid payload for ingredients provided', () => {
      it('returns false', () => {
        const payload = {
          recipeName: 'Jajecznica',
          ingredients: [
            {
              name: 'jajka',
              quantity: 0,
              quantityUnit: 'szt.',
            },
            {
              name: 'masło',
              quantity: 20,
              quantityUnit: 'g',
            },
          ],
          description: 'Proste i pyszne śniadanie na dobry początek dnia!',
          instructions: 'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
        };
        const command = plainToClass(AddNewRecipeCommand, payload);
        expect(command.isValid()).toBe(false);
      });
    });

    describe('when valid payload provided', () => {
      it('returns true', () => {
        const payload = {
          recipeName: 'Jajecznica',
          ingredients: [
            {
              name: 'jajka',
              quantity: 4,
              quantityUnit: 'szt.',
            },
            {
              name: 'masło',
              quantity: 20,
              quantityUnit: 'g',
            },
          ],
          description: 'Proste i pyszne śniadanie na dobry początek dnia!',
          instructions: 'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
        };
        const command = plainToClass(AddNewRecipeCommand, payload);
        expect(command.isValid()).toBe(true);
      });
    });
  });
});
