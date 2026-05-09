import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const loggerType = configService.get<string>('LOGGER_TYPE', 'dev');

  switch (loggerType) {
    case 'json':
      app.useLogger(new JsonLogger());
      break;

    case 'tskv':
      app.useLogger(new TskvLogger());
      break;

    default:
      app.useLogger(new DevLogger());
  }
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  // глобальный пайплайн валидации
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет лишние поля
      transform: true, // преобразует типы данных
    }),
  );
  await app.listen(port ?? 3000);
}
bootstrap();
