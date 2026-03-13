import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const logger = new Logger('API');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Cafestreet')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addBearerAuth() // 🔐 JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
  logger.log('http://localhost:3001/api/docs');
}
//npx typeorm-ts-node-commonjs  migration:generate src/database/migrations/create-address-table -d src/data-source.ts
//npx typeorm-ts-node-commonjs  migration:run -d src/data-source.ts
bootstrap();
