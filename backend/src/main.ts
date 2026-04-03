import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
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
