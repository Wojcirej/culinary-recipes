import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';
import * as request from 'supertest';

describe('HealthcheckController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /health', () => {
    it('should return HTTP 200 status', () => {
      return request(app.getHttpServer()).get('/health').expect(200);
    });

    it('should return json response', () => {
      return request(app.getHttpServer())
        .get('/health')
        .then((response) => {
          expect(response.body).toEqual({ web: 'ok' });
        });
    });
  });
});
