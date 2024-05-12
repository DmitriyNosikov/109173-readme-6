/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app/app.module';
import { ConfigEnvironment } from '@project/shared/core';
import { UserConfigEnum } from '@project/user/user-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // Подключаем сервис для работы с .env конфигурацией
  const swaggerConfig = new DocumentBuilder() // Настраиваем Swagger для формирования документации
    .setTitle('The "User" service')
    .setDescription('User service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  // Подключаем валидацию DTO на основе class-validator
  app.useGlobalPipes(new ValidationPipe({
    transform: true // + трансформация типов данных на основе DTO
  }));

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('spec', app, swaggerDocument);

  const host = configService.get(`${ConfigEnvironment.USER}.${UserConfigEnum.HOST}`);
  const port = configService.get(`${ConfigEnvironment.USER}.${UserConfigEnum.PORT}`);

  console.log('PROCESS ENV: ', ConfigEnvironment.USER, UserConfigEnum.HOST, host);

  await app.listen(port, host);

  Logger.log(`🚀 Application is running on: http://${host}:${port}/${globalPrefix}`);
}

bootstrap();
