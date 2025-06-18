import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //Esto antepone la palabra api/v2 de manera global en el controlador de pokemon
  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions:{
      enableImplicitConversion: true,
    }
  })
);

  const port = configService.get<number>('port') || 3001;
  await app.listen(port);
  console.log(`App running en port ${ process.env.PORT }`)
}
bootstrap();
