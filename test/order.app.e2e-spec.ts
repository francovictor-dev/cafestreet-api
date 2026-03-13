import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateOrderDto } from '../src/order/dto/create-order.dto';

import * as request from 'supertest';
import { App } from 'supertest/types';

describe('Order controller (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /order', async () => {
    const dto: CreateOrderDto = {
      clientId: 2,
      deliverymanId: 1,
      items: [
        /*  {
          
        } */
      ],
    };
    const res = await request(app.getHttpServer())
      .post('/order')
      .send({ userId: 3 })
      .expect(201);

    console.log(res.body);
    expect(res.body).toHaveProperty('userId');
  });

  it('GET /deliveryman', async () => {
    const res = await request(app.getHttpServer()).get('/client').expect(200);

    expect(res.body).toBeInstanceOf(Array);
    console.log(res.body);
  });
});
