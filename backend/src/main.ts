import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  // глобальный пайплайн валидации
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет лишние поля
      transform: true, // преобразует типы данных
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
