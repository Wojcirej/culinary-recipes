import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddNewRecipeController } from './addNewRecipe.controller';
import * as request from 'supertest';

describe('AddNewRecipeController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddNewRecipeController],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  describe('POST /recipes', () => {
    describe('when invalid payload provided', () => {
      it('responds with HTTP 422 status', async () => {
        const payload = {
          recipeName: 'Jajecznica',
          ingredients: [],
          description: 'Proste i pyszne śniadanie na dobry początek dnia!',
          instructions: 'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
        };

        return request(app.getHttpServer())
          .post('/recipes')
          .set('Accept', 'application/json')
          .send(payload)
          .expect('Content-Type', /json/)
          .expect(422);
      });

      it('responds with appropriate error message', async () => {
        const payload = {
          recipeName: 'Jajecznica',
          ingredients: [],
          description: 'Proste i pyszne śniadanie na dobry początek dnia!',
          instructions: 'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
        };

        return request(app.getHttpServer())
          .post('/recipes')
          .set('Accept', 'application/json')
          .send(payload)
          .then((response) => {
            expect(response.body).toEqual({ message: 'Invalid payload' });
          });
      });
    });

    describe('when valid payload provided', () => {
      it('responds with HTTP 201 status', async () => {
        const payload = {
          recipeName: 'Jajecznica',
          ingredients: [
            {
              name: 'jajka',
              quantity: '4',
              quantityUnit: 'szt.',
            },
            {
              name: 'masło',
              quantity: '20',
              quantityUnit: 'g',
            },
          ],
          description: 'Proste i pyszne śniadanie na dobry początek dnia!',
          instructions: 'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
        };

        return request(app.getHttpServer())
          .post('/recipes')
          .set('Accept', 'application/json')
          .send(payload)
          .expect('Content-Type', /json/)
          .expect(201);
      });

      it('responds with appropriate success message', async () => {
        const payload = {
          recipeName: 'Jajecznica',
          ingredients: [
            {
              name: 'jajka',
              quantity: '4',
              quantityUnit: 'szt.',
            },
            {
              name: 'masło',
              quantity: '20',
              quantityUnit: 'g',
            },
          ],
          description: 'Proste i pyszne śniadanie na dobry początek dnia!',
          instructions: 'Rozbić jajka, wybełtać, usmażyć i gotowe :)))',
        };

        return request(app.getHttpServer())
          .post('/recipes')
          .set('Accept', 'application/json')
          .send(payload)
          .then((response) => {
            expect(response.body).toEqual({ message: 'Success' });
          });
      });
    });
  });
});
