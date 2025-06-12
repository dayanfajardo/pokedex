import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Esto antepone la palabra api/v2 de manera global en el controlador de pokemon
  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  })
);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
