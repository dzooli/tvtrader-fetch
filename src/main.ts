// Copyright (c) 2023 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JSONStatusInterceptor } from './interceptors/json-status/json-status.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // API prefix
  app.setGlobalPrefix('api');
  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // Global interceptors
  app.useGlobalInterceptors(new JSONStatusInterceptor());
  // Data validation
  app.useGlobalPipes(new ValidationPipe());
  // Secure headers
  app.use(helmet());

  // Swagger UI
  const config = new DocumentBuilder()
    .setTitle('TradingView Fetch API')
    .setDescription(
      'Fetch prices from TradingView into an InfluxDb compatible JSON format.',
    )
    .setVersion('1.0')
    .addTag('price')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
