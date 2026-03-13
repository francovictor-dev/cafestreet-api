import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /user', async () => {
    const res = await request(app.getHttpServer())
      .post('/user')
      .send({
        email: 'franco_linkin@hotmail.com',
        password: 'Senha123',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('franco_linkin@hotmail.com');
  });

  it('GET /user', async () => {
    const res = await request(app.getHttpServer()).get('/user').expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('id');
  });

  it('GET /user/:id', async () => {
    const res = await request(app.getHttpServer()).get('/user/2').expect(200);
    expect(res.body.id).toBe(1);
    expect(res.body).toHaveProperty('id');
  });

  it('PUT /user/:id', async () => {
    const res = await request(app.getHttpServer())
      .put('/user/2')
      .send({
        email: 'franco_linkin1@hotmail.com',
      })
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toBe('franco_linkin1@hotmail.com');
  });
});
