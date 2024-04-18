/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app/app.module';
import { ConfigEnvironment } from '@project/shared/core';
import { UserConfigEnum } from 'libs/user/user-config/src';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('The "User" service')
    .setDescription('User service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('spec', app, swaggerDocument);

  const host = configService.get(`${ConfigEnvironment.USER}.${UserConfigEnum.HOST}`);
  const port = configService.get(`${ConfigEnvironment.USER}.${UserConfigEnum.PORT}`);

  await app.listen(port, host);

  Logger.log(`🚀 Application is running on: http://${host}:${port}/${globalPrefix}`);
}

bootstrap();
