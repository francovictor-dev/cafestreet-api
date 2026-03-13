import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const seedService = app.get(SeedService);

  console.warn('INICIOU');
  await seedService.run();
  console.warn('TERMINOU');
  await app.close();
}

bootstrap();
