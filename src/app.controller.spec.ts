import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import * as request from 'supertest';

describe('AppController', () => {
  let appController: AppController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);

    app = module.createNestApplication();
    await app.init();
  });

  describe('root', () => {
    it('should return web property with ok value', () => {
      expect(appController.health()).toEqual({ web: 'ok' });
    });

    it('should return HTTP 200 status', () => {
      return request(app.getHttpServer()).get('/').expect(200);
    });

    it('should return json response', () => {
      return request(app.getHttpServer())
        .get('/')
        .then((response) => {
          expect(response.body).toEqual({ web: 'ok' });
        });
    });
  });
});
