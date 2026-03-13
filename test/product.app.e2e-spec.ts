import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { productCreateMock, productUpdateMock } from './mocks/product.mock';

describe('Product controller (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /product', async () => {
    const res = await request(app.getHttpServer())
      .post('/product')
      .send(productCreateMock)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Café Express');
  });

  it('PUT /product/:id', async () => {
    const res = await request(app.getHttpServer())
      .put('/product/1')
      .send(productUpdateMock)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('amount');
    expect(res.body.amount).toBe(productUpdateMock.amount);
  });

  it('GET /product', async () => {
    const res = await request(app.getHttpServer()).get('/product').expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('id');
    console.log(res.body);
  });

  it('GET /product/:id', async () => {
    const res = await request(app.getHttpServer())
      .get('/product/1')
      .expect(200);
    expect(res.body.id).toBe(1);
    expect(res.body).toHaveProperty('id');
  });
});
